import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
import random

print("--- LUMINA: INICIANDO EXPEDICIÓN PATRÍSTICA (MODO EDICIÓN CRÍTICA CON NOTAS) ---")

arranques = {
    "Mateo": "c1.html",
    "Marcos": "c284.html",
    "Lucas": "c390.html",
    "Juan": "c637.html"
}

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

datos_comentarios = []
id_comentario_actual = 5001

for evangelista, pagina_inicial in arranques.items():
    print(f"\nAbriendo los manuscritos del Evangelio según San {evangelista}...")
    pagina_actual = pagina_inicial
    
    while pagina_actual:
        url = f'https://hjg.com.ar/catena/{pagina_actual}'
        
        try:
            respuesta = requests.get(url, headers=headers, timeout=15)
            respuesta.raise_for_status()
            respuesta.encoding = 'iso-8859-1' 
            sopa = BeautifulSoup(respuesta.text, 'html.parser')
            
            div_titulo = sopa.find('div', style=lambda s: s and '14px' in s and 'bold' in s)
            
            if div_titulo:
                referencia_completa = div_titulo.text.strip()
                print(f" Explorando: {referencia_completa}...")
            else:
                referencia_completa = f"Evangelio según san {evangelista} (Prefacio)"
                print(f" Explorando: Prefacio / Introducción de {evangelista}...")

            cajas_intro = sopa.find_all('div', class_='com2')
            for intro in cajas_intro:
                texto_intro = intro.text.strip()
                if texto_intro:
                    datos_comentarios.append({
                        'ID_Comentario': id_comentario_actual,
                        'Referencia_Biblica': referencia_completa,
                        'Autor': 'Introducción General',
                        'Texto_Comentario': texto_intro
                    })
                    id_comentario_actual += 1

            # RESCATE DE AUTORES, COMENTARIOS Y NOTAS AL PIE
            cajas_autores = sopa.find_all('div', class_='pat')
            for caja_autor in cajas_autores:
                autor = caja_autor.text.strip()
                caja_comentario = caja_autor.find_next_sibling('div', class_='com')
                
                if caja_comentario:
                    comentario = caja_comentario.text.strip()
                    
                    # --- MAGIA EXEGÉTICA: Búsqueda de Notas al Pie ---
                    referencias = caja_comentario.find_all('span', class_='notaref')
                    if referencias:
                        notas_anexadas = []
                        for ref in referencias:
                            enlace = ref.find('a')
                            if enlace and enlace.has_attr('href'):
                                id_nota = enlace['href'].replace('#', '') # Ej: "n1"
                                
                                # Buscamos el ancla correspondiente en la parte inferior de la página
                                ancla_destino = sopa.find('a', attrs={'name': id_nota})
                                if ancla_destino:
                                    div_nota = ancla_destino.find_parent('div', class_='nota')
                                    if div_nota:
                                        # Limpiamos los saltos de línea extra de la nota
                                        texto_nota = " ".join(div_nota.text.split())
                                        notas_anexadas.append(texto_nota)
                        
                        # Si encontramos notas, las anexamos bellamente al final del comentario
                        if notas_anexadas:
                            comentario += "\n\n(Notas al pie: " + " | ".join(notas_anexadas) + ")"
                    # ---------------------------------------------------

                    datos_comentarios.append({
                        'ID_Comentario': id_comentario_actual,
                        'Referencia_Biblica': referencia_completa,
                        'Autor': autor,
                        'Texto_Comentario': comentario
                    })
                    id_comentario_actual += 1

            siguiente_url = None
            enlaces = sopa.find_all('a')
            for enlace in enlaces:
                imagen = enlace.find('img')
                if imagen and 'fr.gif' in imagen.get('src', ''):
                    siguiente_url = enlace.get('href')
                    break
            
            if not siguiente_url:
                print(f"--- Fin del Evangelio según San {evangelista} alcanzado ---")
                break
            
            if siguiente_url in arranques.values():
                print(f"--- Fin del Evangelio según San {evangelista} alcanzado (conectado al siguiente) ---")
                break
                
            pagina_actual = siguiente_url
            time.sleep(random.uniform(1.2, 2.5))

        except requests.exceptions.RequestException as e:
            print(f"⚠️ Alerta del Servidor ({e}). Esperando 15 segundos para enfriar la conexión...")
            time.sleep(15)
            continue 
            
        except Exception as e:
            print(f"❌ Error crítico en {url}: {e}")
            break

# Exportamos la base de datos completa
df_comentarios = pd.DataFrame(datos_comentarios)
df_comentarios.to_excel('Catena_Aurea_Completa.xlsx', index=False)
df_comentarios.to_json('Catena_Aurea_Completa.json', orient='records', force_ascii=False, indent=4)

print(f"\n¡Expedición finalizada! Se rescataron {len(datos_comentarios)} joyas de la Tradición (incluyendo sus notas al pie) y están listas para Lumina.")
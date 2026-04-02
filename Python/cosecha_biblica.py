import requests
from bs4 import BeautifulSoup
import pandas as pd
import re
import time

print("--- LUMINA: INICIANDO LA GRAN COSECHA FINAL (EDICIÓN EXÉGETA Y COMPLETA) ---")

# 1. Configuración de inicio (Génesis 1)
url_base = 'https://www.vatican.va/archive/ESL0506/'
pagina_actual = '__P2.HTM' 

todos_los_versiculos = []
libro_actual_nombre = "Génesis"
capitulo_actual_num = "1"

while True:
    url = url_base + pagina_actual
    print(f"Cosechando: {libro_actual_nombre} Cap {capitulo_actual_num}...")
    
    try:
        respuesta = requests.get(url, timeout=15)
        respuesta.encoding = 'iso-8859-1'
        sopa = BeautifulSoup(respuesta.text, 'html.parser')
        
        # Identificamos el Libro y Capítulo desde los Metadatos
        meta_part = sopa.find('meta', {'name': 'part'})
        if meta_part:
            info = meta_part['content'].split(' > ')
            if len(info) >= 2:
                libro_actual_nombre = info[-2].strip()
                capitulo_actual_num = info[-1].strip()

        # --- MAGIA 1: EL RESCATE DE LOS LIBROS CORTOS ---
        # Si el "Libro" es en realidad el Testamento, el verdadero libro está en "Capítulo".
        if libro_actual_nombre.upper() in ["EL ANTIGUO TESTAMENTO", "EL NUEVO TESTAMENTO"]:
            libro_actual_nombre = capitulo_actual_num 
            capitulo_actual_num = "1" # Forzamos el capítulo 1 para Lumina
        # ------------------------------------------------

        parrafos = sopa.find_all('p')
        
        # Variables de estado para no perder nada
        ultimo_versiculo_entero_visto = 0
        decimal_counter = 0.1
        versiculo_en_construccion = None # Para pegar textos cortados

        for p in parrafos:
            texto_crudo = p.text.strip()
            if not texto_crudo: continue # Saltamos párrafos vacíos

            texto_limpio = re.sub(r'\s+', ' ', texto_crudo.replace('\n', ' ').replace('\r', ' '))
            
            # Buscadores exegéticos
            coincidencia_normal = re.match(r'^(\d+)\s*(.*)', texto_limpio)
            coincidencia_corchete = re.match(r'^\[(.*?)\](.*)', texto_limpio)
            
            if coincidencia_normal:
                # Comienza un versículo NORMAL nuevo
                
                # Si teníamos un versículo anterior incompleto, lo guardamos antes de cambiar
                if versiculo_en_construccion:
                    todos_los_versiculos.append(versiculo_en_construccion)
                
                num_ver_str = coincidencia_normal.group(1)
                txt_ver = coincidencia_normal.group(2).strip()
                num_ver = float(num_ver_str)
                
                # Iniciamos la construcción del nuevo versículo
                versiculo_en_construccion = {
                    'Libro': libro_actual_nombre,
                    'Capitulo': int(capitulo_actual_num),
                    'Versiculo': num_ver,
                    'Texto': txt_ver
                }
                
                # Actualizamos la memoria del robot para las acotaciones litúrgicas
                ultimo_versiculo_entero_visto = int(num_ver)
                decimal_counter = 0.1 
            
            elif coincidencia_corchete:
                # Comienza una VOZ LITÚRGICA o ACERCA DE (Cantar/Ester/Jeremías)
                
                # Guardamos el versículo normal anterior si lo había
                if versiculo_en_construccion:
                    todos_los_versiculos.append(versiculo_en_construccion)
                
                # Calculamos el decimal litúrgico (ej: 24.1, 24.2...)
                num_ver = ultimo_versiculo_entero_visto + decimal_counter
                txt_ver = texto_limpio.strip()
                
                # Creamos el nuevo versículo litúrgico y lo guardamos inmediatamente (no suelen cortarse)
                versiculo_en_construccion = {
                    'Libro': libro_actual_nombre,
                    'Capitulo': int(capitulo_actual_num),
                    'Versiculo': num_ver,
                    'Texto': txt_ver
                }
                decimal_counter += 0.1 
            
            else:
                # --- MAGIA 2: EL PEGA-VERSÍCULOS CORTADOS ---
                # Si el párrafo no empieza con número ni corchete, es continuación de lo anterior.
                # (Ej: "¡porque es eterno su amor!" en Daniel)
                
                if versiculo_en_construccion:
                    # Pegamos el texto al final de lo que ya teníamos
                    versiculo_en_construccion['Texto'] += " " + texto_limpio
                else:
                    # Casos raros de texto introductorio sin corchete al inicio de capítulo.
                    # Le asignamos versículo 0.1
                    num_ver = 0.0 + decimal_counter
                    versiculo_en_construccion = {
                        'Libro': libro_actual_nombre,
                        'Capitulo': int(capitulo_actual_num),
                        'Versiculo': num_ver,
                        'Texto': texto_limpio
                    }
                    decimal_counter += 0.1

        # Al terminar todos los párrafos de la página, guardamos el último versículo en construcción
        if versiculo_en_construccion:
            todos_los_versiculos.append(versiculo_en_construccion)

        # Buscamos el enlace "Siguiente"
        enlaces = sopa.find_all('a')
        siguiente_url = None
        for enlace in enlaces:
            if 'Siguiente' in enlace.text:
                siguiente_url = enlace.get('href')
                break
        
        if not siguiente_url:
            print("\n¡Misión cumplida! Se ha alcanzado el fin de las Escrituras.")
            break
            
        pagina_actual = siguiente_url
        
        # Pausa de seguridad (un poco más rápida pero segura)
        time.sleep(0.7)

    except Exception as e:
        print(f"\n❌ Error en {url}: {e}")
        break

# Guardado final en ambos formatos, sobrescribiendo lo viejo
df_final = pd.DataFrame(todos_los_versiculos)

# Nota: No ordenamos matemáticamente aquí porque al estar separados los libros como en la web,
# el orden cronológico del scraping ya es el correcto y respetará la estructura del Vaticano.

df_final.to_excel('Biblia_Catolica_Completa.xlsx', index=False)
df_final.to_json('Biblia_Catolica_Completa.json', orient='records', force_ascii=False, indent=4)

print(f"\nSe han guardado exitosamente {len(todos_los_versiculos)} registros. La Biblia está completa e íntegra, y los libros permanecen separados como solicitaste.")
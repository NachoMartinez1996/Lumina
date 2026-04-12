import requests
from bs4 import BeautifulSoup
import json
import time
import re

# URLs base
base_url = "https://www.augustinus.it/spagnolo/esposizioni_salmi/"
sommario_url = f"{base_url}sommario.htm"

comentarios_agustin = {}

print("🔍 Paso 1: Leyendo el índice (sommario.htm) para desentrañar el menú...")

try:
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    response_sommario = requests.get(sommario_url, headers=headers)
    response_sommario.encoding = 'iso-8859-1'
    soup_sommario = BeautifulSoup(response_sommario.text, 'html.parser')
    
    opciones = soup_sommario.find_all('option')
    enlaces_salmos = [opt for opt in opciones if opt.get('value') and opt.get('value').endswith('_testo.htm')]
    
    if len(enlaces_salmos) == 0:
        enlaces_a = soup_sommario.find_all('a')
        enlaces_salmos = [a for a in enlaces_a if a.get('href') and a.get('href').endswith('_testo.htm')]
    
    print(f"✅ ¡Se encontraron {len(enlaces_salmos)} textos/sermones en total!")
    
    if len(enlaces_salmos) == 0:
        print("⚠️ Sigue sin encontrar los enlaces. La estructura de la web es diferente a la esperada.")
    else:
        print("🚀 Paso 2: Comenzando la extracción profunda...\n")
        
        for item in enlaces_salmos:
            href = item.get('value') if item.name == 'option' else item.get('href')
            nombre_salmo = item.get_text(strip=True)
            url_salmo = f"{base_url}{href}"
            
            print(f"📖 Extrayendo Salmo {nombre_salmo} desde: {url_salmo}...")
            
            # ESTE ES EL TRY INTERNO QUE ESTABA MAL ALINEADO
            try:
                response = requests.get(url_salmo, headers=headers)
                response.encoding = 'iso-8859-1' 
                
                if response.status_code == 200:
                    soup = BeautifulSoup(response.text, 'html.parser')
                    
                    for sup in soup.find_all('sup'):
                        sup.decompose()
                    for a in soup.find_all('a'):
                        if a.get_text(strip=True).isdigit():
                            a.decompose()

                    parrafos = soup.find_all('p')
                    texto_limpio = []
                    
                    for p in parrafos:
                        texto = p.get_text(separator=' ', strip=True)
                        texto = re.sub(r'(?<=[a-zA-ZáéíóúÁÉÍÓÚñÑ])\d+', '', texto)
                        texto = re.sub(r'([,.:;?!])(?=[a-zA-ZáéíóúÁÉÍÓÚñÑ])', r'\1 ', texto)
                        texto = re.sub(r'(\])(?=[a-zA-ZáéíóúÁÉÍÓÚñÑ])', r'\1 ', texto)
                        texto = re.sub(r'\s+', ' ', texto).strip()
                        
                        if texto != "":
                            texto_limpio.append(texto)
                    
                    comentarios_agustin[f"Salmo_{nombre_salmo}"] = texto_limpio
                else:
                    print(f"⚠️ Error al acceder al Salmo {nombre_salmo} (Status: {response.status_code})")
                    
            except Exception as e:
                 print(f"Error en Salmo {nombre_salmo}: {e}")
            
            time.sleep(1)

        # Guardado del JSON (dentro del bloque else del primer try)
        with open("agustin_salmos.json", "w", encoding="utf-8") as file:
            json.dump(comentarios_agustin, file, ensure_ascii=False, indent=4)

        print("\n🎉 ¡Extracción terminada! San Agustín ya está listo en agustin_salmos.json.")

except Exception as e:
    print(f"Error al leer el índice: {e}")
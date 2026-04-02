import requests
from bs4 import BeautifulSoup
import pandas as pd
import re
import time # Importamos el reloj para ser respetuosos con el servidor

print("Iniciando la expedición completa por el Evangelio de Mateo...\n")

# 1. Abrimos la estantería vacía original
df_biblia = pd.read_excel('Biblia_MVP_Mateo.xlsx')
df_biblia['Texto_Biblico'] = df_biblia['Texto_Biblico'].astype(str)

# 2. Configuramos el punto de partida
url_base = 'https://www.vatican.va/archive/ESL0506/'
pagina_actual = '__PUB.HTM' # Aquí arranca Mateo 1

# 3. El gran bucle: recorrer los 28 capítulos
for capitulo in range(1, 29):
    url = url_base + pagina_actual
    print(f"Explorando Capítulo {capitulo}...")
    
    respuesta = requests.get(url)
    respuesta.encoding = 'iso-8859-1' 
    sopa = BeautifulSoup(respuesta.text, 'html.parser')
    
    parrafos = sopa.find_all('p', class_='MsoNormal')
    
    # Extraemos los versículos de esta página
    for p in parrafos:
        texto_crudo = p.text.strip()
        if not texto_crudo:
            continue

        texto_limpio = texto_crudo.replace('\n', ' ').replace('\r', ' ')
        texto_limpio = re.sub(r'\s+', ' ', texto_limpio)

        coincidencia = re.match(r'^(\d+)\s*(.*)', texto_limpio)
        
        if coincidencia:
            num_versiculo = int(coincidencia.group(1))
            texto_versiculo = coincidencia.group(2)
            
            # Buscamos la fila exacta usando el número de capítulo del bucle
            mascara = (df_biblia['Capitulo'] == capitulo) & (df_biblia['Versiculo'] == num_versiculo)
            df_biblia.loc[mascara, 'Texto_Biblico'] = texto_versiculo
            
    # 4. El truco de la araña: Buscar el enlace al capítulo "Siguiente"
    enlaces = sopa.find_all('a')
    enlace_encontrado = False
    
    for enlace in enlaces:
        if 'Siguiente' in enlace.text:
            pagina_actual = enlace.get('href') # Tomamos el destino del enlace
            enlace_encontrado = True
            break # Dejamos de buscar enlaces
            
    if not enlace_encontrado and capitulo < 28:
        print(f"⚠️ Atención: No se encontró el botón 'Siguiente' en el capítulo {capitulo}.")
        break

    # Pausa de 1 segundo para no saturar los servidores del Vaticano
    time.sleep(1)

# 5. Guardamos la obra magna
df_biblia.to_excel('Biblia_MVP_Mateo_Completo.xlsx', index=False)
df_biblia.to_json('Biblia_MVP_Mateo_Completo.json', orient='records', force_ascii=False, indent=4)

print("\n¡Misión cumplida! Todo el Evangelio de San Mateo fue descargado e integrado a tu matriz matemática.")
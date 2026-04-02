import requests
from bs4 import BeautifulSoup
import pandas as pd
import time 

print("Iniciando la expedición ajustada por el Capítulo 1 de San Mateo...\n")

datos_comentarios = []
id_comentario_actual = 5001

for numero_pagina in range(1, 16):
    url = f'https://hjg.com.ar/catena/c{numero_pagina}.html'
    
    respuesta = requests.get(url)
    respuesta.encoding = 'iso-8859-1' 
    sopa = BeautifulSoup(respuesta.text, 'html.parser')
    
    # EL TRUCO VISUAL: Buscamos el div que tiene la letra en 14px y negrita (donde HJG guarda el título)
    div_titulo = sopa.find('div', style=lambda s: s and '14px' in s and 'bold' in s)
    
    if div_titulo:
        # Extraemos el texto, pero le quitamos cualquier basura oculta
        referencia_completa = div_titulo.text.strip()
        print(f"Explorando: {referencia_completa}...")
    else:
        referencia_completa = f"Prefacio / Introducción"
        print(f"Explorando: {url}...")

    # 1. Rescatamos las introducciones generales (com2)
    cajas_intro = sopa.find_all('div', class_='com2')
    for intro in cajas_intro:
        texto_intro = intro.text.strip()
        if texto_intro:
            datos_comentarios.append({
                'ID_Comentario': id_comentario_actual,
                'Referencia_Biblica': referencia_completa, # Guardamos el rango real (ej: 1:24-25)
                'Autor': 'Introducción General',
                'Texto_Comentario': texto_intro
            })
            id_comentario_actual += 1

    # 2. Rescatamos a los Padres de la Iglesia (pat y com)
    cajas_autores = sopa.find_all('div', class_='pat')
    for caja_autor in cajas_autores:
        autor = caja_autor.text.strip()
        caja_comentario = caja_autor.find_next_sibling('div', class_='com')
        
        if caja_comentario:
            comentario = caja_comentario.text.strip()
            
            datos_comentarios.append({
                'ID_Comentario': id_comentario_actual,
                'Referencia_Biblica': referencia_completa,
                'Autor': autor,
                'Texto_Comentario': comentario
            })
            id_comentario_actual += 1

    time.sleep(1)

# Exportamos la base de datos actualizada
df_comentarios = pd.DataFrame(datos_comentarios)
df_comentarios.to_excel('Mateo_Cap1_Real.xlsx', index=False)
df_comentarios.to_json('Mateo_Cap1_Real.json', orient='records', force_ascii=False, indent=4)

print(f"\n¡Expedición finalizada! El JSON está listo para ser enviado al equipo de diseño.")
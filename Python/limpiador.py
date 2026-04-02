import pandas as pd
import re

print("--- LUMINA: INICIANDO OPERACIÓN ESCOBA 3.0 (CAZANDO REBELDES) ---")

df_biblia = pd.read_excel('Biblia_Catolica_Completa.xlsx')
total_original = len(df_biblia)

def es_titulo_de_capitulo(texto):
    if pd.isna(texto): return True
    
    # Cambiamos re.match por re.search y quitamos el "^".
    # Ahora escanea toda la celda buscando "Capítulo X" en cualquier lugar.
    return bool(re.search(r'(?i)Cap[íi]tulo\s*\d+', str(texto).strip()))

df_limpio = df_biblia[~df_biblia['Texto'].apply(es_titulo_de_capitulo)]
borrados = total_original - len(df_limpio)

df_limpio.to_excel('Biblia_Catolica_Completa.xlsx', index=False)
df_limpio.to_json('Biblia_Catolica_Completa.json', orient='records', force_ascii=False, indent=4)

print(f"¡Limpieza terminada! Se fulminaron {borrados} subtítulos rebeldes.")
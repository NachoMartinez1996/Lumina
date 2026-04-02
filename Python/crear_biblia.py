import pandas as pd

print("Construyendo la arquitectura matemática de San Mateo...\n")

# Cantidad exacta de versículos por cada uno de los 28 capítulos de Mateo
# (Datos reales para que la matriz sea perfecta)
versiculos_por_capitulo = [
    25, 23, 17, 25, 48, 34, 29, 34, 38, 42, 30, 50, 58, 36,
    39, 28, 27, 35, 30, 34, 46, 46, 39, 51, 46, 75, 66, 20
]

datos_biblia = []
id_libro = 47 # Mateo en el canon católico
nombre_libro = "Mateo"

for capitulo, cantidad_versiculos in enumerate(versiculos_por_capitulo, start=1):
    for versiculo in range(1, cantidad_versiculos + 1):
        
        # Fórmula de ID: 47000000 + (Capítulo * 1000) + Versículo
        id_unico = (id_libro * 1000000) + (capitulo * 1000) + versiculo
        
        datos_biblia.append({
            'ID_Versiculo': id_unico,
            'Libro': nombre_libro,
            'Capitulo': capitulo,
            'Versiculo': versiculo,
            'Referencia': f"{nombre_libro} {capitulo},{versiculo}",
            'Texto_Biblico': "" # Columna vacía, lista para recibir el texto sagrado
        })

# Exportamos la estructura a Excel y a JSON
df_biblia = pd.DataFrame(datos_biblia)
df_biblia.to_excel('Biblia_MVP_Mateo.xlsx', index=False)
df_biblia.to_json('Biblia_MVP_Mateo.json', orient='records', force_ascii=False, indent=4)

print(f"¡Arquitectura completada! Se generaron los {len(datos_biblia)} versículos exactos de San Mateo.")
import pandas as pd

# 1. Armamos la estructura de la pestaña "Libros"
datos_libros = {
    'ID_Libro': [1], 
    'Nombre': ['Mateo'], 
    'Abreviatura': ['Mt']
}
df_libros = pd.DataFrame(datos_libros)

# 2. Armamos la estructura de la pestaña "Versículos"
datos_versiculos = {
    'ID_Versiculo': [1001, 1002],
    'ID_Libro': [1, 1],
    'Capitulo': [1, 1],
    'Versiculo': [1, 2],
    'Texto_Biblico': [
        'Libro de la genealogía de Jesucristo, hijo de David, hijo de Abraham.',
        'Abraham engendró a Isaac; e Isaac engendró a Jacob; y Jacob engendró a Judá y a sus hermanos;'
    ]
}
df_versiculos = pd.DataFrame(datos_versiculos)

# 3. Armamos la estructura de la pestaña "Comentarios"
datos_comentarios = {
    'ID_Comentario': [5001, 5002],
    'ID_Versiculo': [1001, 1001],
    'Autor': ['San Jerónimo', 'Santo Tomás de Aquino'],
    'Texto_Comentario': [
        'En Isaías se lee: "La generación de éste, ¿quién la contará?". No se crea, pues, que el evangelista contradice al profeta...',
        'Al decir "hijo de David, hijo de Abraham", el evangelista nombra primero a David, porque su promesa era más reciente...'
    ]
}
df_comentarios = pd.DataFrame(datos_comentarios)

# 4. La orden final: Crear el archivo Excel
ruta_archivo = 'Base_Lumina.xlsx'

with pd.ExcelWriter(ruta_archivo, engine='openpyxl') as writer:
    df_libros.to_excel(writer, sheet_name='Libros', index=False)
    df_versiculos.to_excel(writer, sheet_name='Versículos', index=False)
    df_comentarios.to_excel(writer, sheet_name='Comentarios', index=False)

print("¡Éxito total! El archivo Base_Lumina.xlsx fue creado en tu carpeta.")
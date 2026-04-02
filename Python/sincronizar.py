import pandas as pd

print("Sincronizando tus ediciones manuales del Excel hacia el JSON...")

# 1. Leemos el Excel que acabás de editar y curar manualmente
df_biblia = pd.read_excel('Biblia_Catolica_Completa.xlsx')

# 2. Lo exportamos y aplastamos el JSON viejo
df_biblia.to_json('Biblia_Catolica_Completa.json', orient='records', force_ascii=False, indent=4)

print("¡Sincronización perfecta! Lumina ya tiene los datos actualizados.")
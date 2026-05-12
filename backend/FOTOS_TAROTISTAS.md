# 📸 Cómo Agregar Fotos de Tarotistas

## Pasos:

### 1. Supabase Storage
- Ir: https://supabase.com → Tu proyecto
- Storage → Crear bucket `tarotistas`
- Upload fotos (JPG/PNG)
- Nombrar: `paqui.jpg`, `gloria.jpg`, etc.

### 2. URL Pública
- Click foto → Copy URL
- Formato: `https://[tu-project].supabase.co/storage/v1/object/public/tarotistas/paqui.jpg`

### 3. Actualizar BD
SQL:
```sql
UPDATE tarotistas 
SET imagen_url = 'https://[tu-project].supabase.co/storage/v1/object/public/tarotistas/paqui.jpg'
WHERE nombre = 'Paqui';
```

Repetir para cada tarotista.

---

## Fotos Necesarias:
- paqui.jpg ✓
- gloria.jpg ✓
- raquel.jpg ✓
- veronica.jpg ✓
- mercedes.jpg ✓
- paola.jpg ✓
- marian.jpg ✓
- yeyo.jpg ✓
- marcos.jpg ✓

---

## Frontend
Frontend ya carga fotos automático si existen URLs.

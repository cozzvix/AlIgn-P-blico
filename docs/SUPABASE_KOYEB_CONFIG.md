# Configuracion de Supabase para Koyeb

## Problema: Los links de Supabase apuntan a localhost

Cuando Supabase envia correos de verificacion o restablecimiento de contrasena, 
usa la URL que tienes configurada en el dashboard de Supabase.

## Solucion

### 1. Configurar URL en Supabase Dashboard

1. Ve a tu proyecto en [Supabase Dashboard](https://supabase.com/dashboard)
2. Navega a **Authentication** > **URL Configuration**
3. Configura las siguientes URLs:

**Site URL:**
```
https://TU-APP.koyeb.app
```

**Redirect URLs (agrega estas):**
```
https://TU-APP.koyeb.app/auth/callback
https://TU-APP.koyeb.app/auth/callback?next=/actividades
https://TU-APP.koyeb.app/auth/callback?next=/reset-password
```

### 2. Variables de Entorno en Koyeb

Asegurate de tener estas variables de entorno configuradas en Koyeb:

```
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
NEXT_PUBLIC_SITE_URL=https://TU-APP.koyeb.app
```

### 3. (Opcional) Para desarrollo local

Si quieres probar los emails en desarrollo local, puedes agregar temporalmente
`http://localhost:3000/auth/callback` a los Redirect URLs.

## Verificacion

Despues de hacer estos cambios:

1. Prueba crear una nueva cuenta
2. El correo de verificacion deberia tener un link que apunte a tu app en Koyeb
3. Prueba "Olvide mi contrasena" - el link deberia funcionar correctamente

## Si personalizaste las plantillas de correo

Para confirmacion de email, usa el callback del proyecto con `token_hash` y
`type=email`. Ejemplo:

```
{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=email&next=/actividades
```

Para recuperacion de contrasena:

```
{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=recovery&next=/reset-password
```

Si usas los templates default de Supabase, no necesitas pegar estos links; solo
asegurate de que `NEXT_PUBLIC_SITE_URL`, `Site URL` y los `Redirect URLs` apunten
a la misma app desplegada.

## Notas

- Los cambios en Supabase se aplican inmediatamente
- Si ya tienes correos pendientes con links antiguos, esos links seguiran apuntando a localhost
- Solo los nuevos correos usaran la URL correcta

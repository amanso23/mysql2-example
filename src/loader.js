import { isBuiltin } from 'node:module';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

export const resolve = (specifier, context, nextResolve) => {

  // Si es un módulo nativo (builtin) o un paquete, no modificar
  if (isBuiltin(specifier) || !specifier.startsWith('./') && !specifier.startsWith('../') && !specifier.startsWith('/')) {
    return nextResolve(specifier, context);
  }

  // Añade .js si es un archivo relativo sin extensión
  if (!specifier.endsWith('.js') && !specifier.endsWith('.mjs') && !specifier.endsWith('.json')) {
    // Verifica si la ruta es un directorio y busca un index.js
    const directoryPath = join(process.cwd(), specifier);

    if (existsSync(directoryPath) && existsSync(join(directoryPath, 'index.js'))) {    
      return nextResolve(`${specifier}/index.js`, context);
    }

    // Si no es un directorio, asume que es un archivo
    return nextResolve(`${specifier}.js`, context);
  }

  // Mantenemos los imports que ya tienen extensión
  return nextResolve(specifier, context);
};


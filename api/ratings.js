import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    try {
      const data = await kv.get('bodegas_ratings');
      return res.status(200).json(data || []);
    } catch (e) {
      return res.status(500).json({ error: 'Error al leer datos' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { person } = req.body;
      if (!person || !person.name) return res.status(400).json({ error: 'Datos inválidos' });

      let data = await kv.get('bodegas_ratings') || [];
      const idx = data.findIndex(p => p.name.toLowerCase() === person.name.toLowerCase());
      if (idx >= 0) data[idx] = person;
      else data.push(person);

      await kv.set('bodegas_ratings', data);
      return res.status(200).json({ ok: true, total: data.length });
    } catch (e) {
      return res.status(500).json({ error: 'Error al guardar' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { name } = req.body;
      let data = await kv.get('bodegas_ratings') || [];
      data = data.filter(p => p.name.toLowerCase() !== name.toLowerCase());
      await kv.set('bodegas_ratings', data);
      return res.status(200).json({ ok: true });
    } catch (e) {
      return res.status(500).json({ error: 'Error al eliminar' });
    }
  }

  return res.status(405).json({ error: 'Método no permitido' });
}

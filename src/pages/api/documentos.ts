// pages/api/documentos.js
import fs from 'fs';
import path from 'path';
import { MongoClient } from 'mongodb';

// import req and res from Next.js API
import type { NextApiRequest, NextApiResponse } from 'next';

// URL de conexão com o MongoDB
const url = 'mongodb://localhost:27017';
const dbName = 'tadw';

// const filePath = path.join(process.cwd(), 'data', 'documentos.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new MongoClient(url);

  const { method } = req;

  try {
    // Connect MongoDB
    await client.connect();
    console.log('conectado sapora');

    const db = client.db(dbName);

    const colecao = db.collection('documentos');

    // Consultar documentos
    const documentos = await colecao.find({}).toArray();
    console.log('Documentos encontrados:', documentos);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
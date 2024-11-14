// pages/api/documentos.js
import fs from 'fs';
import path from 'path';
import { Db, MongoClient } from 'mongodb';

// import req and res from Next.js API
import type { NextApiRequest, NextApiResponse } from 'next';

// URL de conexão com o MongoDB
const URL = process.env.MONGODB_URL || "";
const DB_NAME = process.env.MONGODB_DB_NAME || "";

if (URL == '' || DB_NAME == '') {
  throw new Error("Environment variables must be set");
}

// const filePath = path.join(process.cwd(), 'data', 'documentos.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new MongoClient(URL);

  const { method } = req;

  try {
    // Connect MongoDB
    await client.connect();
    console.log('conectado sapora');

    const db = client.db(DB_NAME);
    const collection = db.collection('documentos');

    // Consultar documentos
    const documentos = await collection.find({}).toArray();
    console.log('Documentos encontrados:', documentos);

    res.status(200).json(documentos);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
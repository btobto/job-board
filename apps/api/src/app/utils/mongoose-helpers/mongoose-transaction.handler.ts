import { ClientSession, Connection } from 'mongoose';

export async function mongooseTransactionHandler<T>(
  connection: Connection,
  method: (session: ClientSession) => Promise<T>
): Promise<T> {
  const session = await connection.startSession();
  session.startTransaction();

  let result: T;
  try {
    result = await method(session);
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }

  return result;
}

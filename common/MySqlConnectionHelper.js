/**
 * Created by mayaj on 2016-05-10.
 */
const promiseMysql = require('mysql2/promise');

const pool = promiseMysql.createPool({
  connectionLimit: 10,
  host: process.env.MY_SQL_CONNECTION_HOST,
  user: process.env.MY_SQL_CONNECTION_USER,
  password: process.env.MY_SQL_CONNECTION_PASSWORD,
  port: process.env.MY_SQL_CONNECTION_PORT,
  database: process.env.MY_SQL_CONNECTION_DB,
});

exports.connect = (fn) => async (...args) => {
  /* DB 커넥션을 한다. */
  let con = await pool.getConnection();
  /* 비지니스 로직에 con을 넘겨준다. */
  const result = await fn(con, ...args).catch((error) => {
    /* 에러시 con을 닫아준다. */
    con.connection.release();
    throw error;
  });
  /* con을 닫아준다. */
  con.connection.release();
  return result;
};

/**
 * 트렌젝션 처리시 사용
 *
 * @param fn
 */
exports.transaction = (fn) => async (...args) => {
  /* DB 커넥션을 한다. */
  let con = await pool.getConnection();
  /* 트렌젝션 시작 */
  await con.connection.beginTransaction();
  /* 비지니스 로직에 con을 넘겨준다. */
  const result = await fn(con, ...args).catch(async (error) => {
    /* rollback을 진행한다. */
    await con.rollback();
    /* 에러시 con을 닫아준다. */
    con.connection.release();
    throw error;
  });
  /* commit을 해준다. */
  await con.commit();
  /* con을 닫아준다. */
  con.connection.release();
  return result;
};

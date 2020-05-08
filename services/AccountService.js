const pool = require('../middleware/Connection');
const mysqlConnection = require('../common/MySqlConnectionHelper');

// //회원 로그인
// exports.login = async (email, password) => {
//   let returnData = [];
//   try {
//     const connection = await pool.getConnection(async conn => conn);
//     try{
//         const [rows] = await connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
//         connection.release();
//         if(rows) {
//           returnData = rows[0];
//           console.log('returnData: ', returnData);
//         }
//         return returnData;
//     }
//     catch(err) {
//         connection.release();
//         console.log('Query Error!');
//         return false;
//     }
//   }
//   catch(err) {
//       console.log('DB ERROR');
//       return false;
//   }
// }

// //회원 존재 검증 여부.
// exports.memeberExists = async (email) => {
//   let returnData = [];
//   try {
//     const connection = await pool.getConnection(async conn => conn);
//     try{
//         const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
//         connection.release();
//         if(rows) {
//           returnData = rows[0];
//           console.log('returnData: ', returnData);
//         }
//         return returnData;
//     }
//     catch(err) {
//         connection.release();
//         console.log('Query Error!');
//         return false;
//     }
//   }
//   catch(err) {
//       console.log('DB Connection ERROR');
//       return false;
//   }
// }

// exports.loginCheck = async (id) => {
//   let returnData = [];
//   try {
//     const connection = await pool.getConnection(async conn => conn);
//     try{
//         const [rows] = await connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
//         connection.release();
//         if(rows) {
//           returnData = rows[0];
//           console.log('returnData: ', returnData);
//         }
//         return returnData;
//     }
//     catch(err) {
//         connection.release();
//         console.log('Query Error!');
//         return false;
//     }
//   }
//   catch(err) {
//       console.log('DB Connection ERROR');
//       return false;
//   }
// }

//회원 존재 검증 여부.
exports.memeberExists = async (email) => {
  let returnData = [];
  const get = mysqlConnection.connect(async (con, email) => {
    const [rows, fields] = await con.query('SELECT * FROM users WHERE email = ?', [email]);
    let resultData = [];
    if(rows) {
      resultData = rows[0];
    }
    //console.log('resultData111: ', resultData[0]);
    return resultData;

  });

  const rows = get(email);
  return rows;
};


exports.testInsert = async () => {

    const insert = mysqlConnection.transaction(async (con) => {
        await con.query("INSERT INTO posts(content, img, createdAt, updatedAt, deletedAt, userId) VALUES('abcd', 'efg', NOW(), NOW(), NULL, 2)");
        // await con.query("INSERT INTO posts(content, img, createdAt, updatedAt, deletedAt, userId) VALUES('abcd', 'efg', NOW(), NOW(), NULL, 2)");
        // await con.query("INSERT INTO posts(content, img, createdAt, updatedAt, deletedAt, userId) VALUES('abcd', 'efg', NOW(), NOW(), NULL, 2)");
        // await con.query("INSERT INTO posts(content, img, createdAt, updatedAt, deletedAt, userId) VALUES('abcd', 'efg', NOW(), NOW(), NULL, 2)");
        // await con.query("INSERT INTO posts(content, img, createdAt, updatedAt, deletedAt, userId) VALUES('abcd', 'efg', NOW(), NOW(), NULL, 2)");
        // await con.query("INSERT INTO posts(content, img, createdAt, updatedAt, deletedAt, userId) VALUES('abcd', 'efg', NOW(), NOW(), NULL, 2)");
        //return;
        return 'success';
    });
    let temp = insert();
    console.log('temp: ', temp);
    return temp;
};


exports.loginCheck = async (id) => {
  let returnData = [];
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const [
        rows,
      ] = await connection.query(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password]
      );
      connection.release();
      if (rows) {
        returnData = rows[0];
        console.log('returnData: ', returnData);
      }
      return returnData;
    } catch (err) {
      connection.release();
      console.log('Query Error!');
      return false;
    }
  } catch (err) {
    console.log('DB Connection ERROR');
    return false;
  }
};

//회원 로그인
exports.login = async (email, password) => {

  let paramData = [email, password];
  const get = mysqlConnection.connect(async (con, email1, password1) => {
    const result = await con.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
    let resultData = [];
    if(result) {
      resultData = result[0];
    }
    return resultData;
  });

  const rows = get(email, password);
  return rows;

};

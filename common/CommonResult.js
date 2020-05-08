exports.commonResult = (resultCode, data, message) => {
  return {
    result: resultCode,
    data: data,
    message: message,
  };
};

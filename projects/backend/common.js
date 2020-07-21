class Common {
  constructor(){}
  async asyncForEach(array, callback) {
    try {
      console.log('async for each', typeof array);
      if(typeof array === 'array') {
        for (let index = 0; index < array.length; index++) {
          console.log('index', index);
          await callback(array[index], index, array);
        }
      }
      else {
        for (let index = 0; index < Object.keys(array).length; index++) {
          await callback(array[Object.keys(array)[index]], index, array);
        }
      }

    } catch (error) {
      throw error
    }
  }
}
module.exports = Common

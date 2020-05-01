const agent = require("superagent");
const { getRes, json2excel } = require("./utils");

let resArr = [];
let taskPromise = (index) => {
  return new Promise((resolve) => {
    agent
      .get(
        `https://emumo.xiami.com/space/collect/u/318132/order/1/p/1/page/${index}`
      )
      .end((err, res) => {
        if (err) {
          console.error(err);
        } else {
          resArr = [...resArr, ...getRes(res)];
        }
        resolve()
      });
  });
};

const main = async () => {
  for (let i = 1; i <= 53; i++) {
    await taskPromise(i);
  }
  console.log('数据量: ',resArr.length);
  json2excel(resArr)
}
main()




const numberToChinese = (num) => {
  // num / 4的余数
  const num_length_rem_four = num.length %4;
  // 如果余数为0，说明是4的整数，就不用加了
  // 否则补充到 4的倍数长度
  num = num_length_rem_four === 0 ? num :'0'.repeat(4-num_length_rem_four) + num;

  let num_array = [], reduce_num = 4;
  const num_length = num.length, unit = ['','万', '亿', '万亿', '兆'];
  
  // 循环一次从右到左 每4个取一次数字,方便组装-千百十
  while(num_length >= reduce_num){
    num_array.push(num.substr(num_length - reduce_num, 4));
    reduce_num += 4;
  }
  const chinese = num_array.map((item, index) => {
    // 四位数 + 单位
    const four_str = fourNumToChinese(item);
    return  four_str + (four_str !== '0' ? unit[index] : '')
  })
  const str = chinese.reverse().join('');
  return str[0] === '0' ? str.substr(1) : str
}

const fourNumToChinese = (num) => {
  const unit = ['千','百','十',''];
  let before_is_zero = false, chin = [];
  
  num.split('').map((item, index) => {
    let val;
    if(item === '0'){
      // 如果自己为0
      if(!before_is_zero && index !== 3){
        //之前不为0且不是最后一位
        //否则会导致 10 -> 一十零
        before_is_zero = true;
        val = '0';
      }
    }else{
      before_is_zero = false;
      val = `${item}${unit[index]}`;
    }
    chin.push(val);

    
  })
  return chin.join('')
}


// console.log(1,numberToChinese('10'));
// console.log(12,numberToChinese('12'));
// console.log(123,numberToChinese('123'));
// console.log(1234,numberToChinese('1234'));
// console.log(12345,numberToChinese('12345'));
// console.log(1234567890,numberToChinese('1234567890'));
console.log(1000000000,numberToChinese('1000000000'));
// console.log(1005000400,numberToChinese('1005000400'));
// console.log(1000100000,numberToChinese('1000100000'));











// 思路
// 1. 隔4个拆开
// 2. 填充上 千百十
// 3. 组装 根据拆开 单数为万  双数为亿













// 1 -> 一
// 12 -> 一十二
// 123 -> 一百二十三
// 1234 -> 一千两百三十四
// 12345 -> 一万两千三百四十五
// 123456 -> 一十二万三千四百五十六
// 1234567 -> 一百二十三万四千五百六十七
// 12345678 -> 一千两百三十四万五千六百七十八
// 123456789 -> 一亿两千三百四十五万六千七百八十九
// 1234567890 -> 十二亿三千四百五十六万七千八百九十
// 12345678900
// 123456789000
// 1234567890000
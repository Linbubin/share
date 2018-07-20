const numberToChinese = (while_num) => {
  // 由于小数点和非小数的处理不同，先将他们拆分
  const num_split = while_num.split('.');
  let num = num_split[0];
  const decimal = num_split[1];

  // num / 4的余数
  const num_length_rem_four = num.length %4;
  // 如果余数为0，说明是4的整数，就不用加了
  // 否则补充到 4的倍数长度
  num = num_length_rem_four === 0 ? num :'0'.repeat(4-num_length_rem_four) + num;

  let num_array = [], reduce_num = 4;
  const num_length = num.length,
    unit = ['','万', '亿', '万亿', '兆'],
    n_trans_c = {
      1: '壹',
      2: '贰',
      3: '叁',
      4: '肆',
      5: '伍',
      6: '陆',
      7: '柒',
      8: '捌',
      9: '玖',
      0: '零',
      '.': '点'
    };
  
  // 循环一次从右到左 每4个取一次数字,方便组装-千百十
  while(num_length >= reduce_num){
    num_array.push(num.substr(num_length - reduce_num, 4));
    reduce_num += 4;
  }
  const chinese = num_array.map((item, index) => {
    // 四位数 + 单位
    const four_str = fourNumToChinese(item);
    // return  four_str + (four_str !== '0' ? unit[index] : '')
    return  four_str + (four_str && four_str !== '0' ? unit[index] : '')
  })
  let str = chinese.reverse().join('');
  // 如果开头的0是组装上去的， 就需要去掉
  str = str[0] === '0' && str !== '0' ? str.substr(1) : str
  // 去掉末尾可能出现的0和中间可能出现的0
  str = str !== '0' ? str.replace(/0+$/, '').replace(/0+/g, '0') : str;
  // 如果有小数，就把小数去掉
  let result = decimal ? str + '.' + decimal.replace(/0+$/, '') : str;
  return result.split('').map(item => n_trans_c[item] ? n_trans_c[item] : item).join('')
}

const fourNumToChinese = (num) => {
  const unit = ['仟','佰','拾',''];
  let before_is_zero = false, chin = [];
  
  num.split('').map((item, index) => {
    let val;
    if(item === '0'){
      // 如果自己为0
      if(!before_is_zero && index !== 3){
        //之前不为0且不是最后一位
        //否则会导致 10 -> 一十零
        //之前不为0 且 不能是最后一位  否则会导致 10 -> 一十零
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


console.log(0,numberToChinese('0'));
console.log(1,numberToChinese('10'));
console.log(12,numberToChinese('12'));
console.log(123,numberToChinese('123'));
console.log(1234,numberToChinese('1234'));
console.log(12345,numberToChinese('12345'));
console.log(1234567890,numberToChinese('1234567890'));
console.log(1000000000,numberToChinese('1000000000'));
// console.log(1005000400,numberToChinese('1005000400'));
// console.log(1000100000,numberToChinese('1000100000'));
console.log(1005000400,numberToChinese('1005000400'));
console.log(1000100000,numberToChinese('1000100000'));
console.log(10000000000001,numberToChinese('10000000000001'));
console.log(0.000005,numberToChinese('0.000005'));
console.log(1.000005,numberToChinese('1.000005'));
console.log(10000000000001,numberToChinese('10000000000001.00050500'));











// 思路
// 1. 先只管整数部分，因为小数基本没什么变化，最多就是把末尾的0给去掉
// 2. 拿到整数和小数，以下未出现小数，则默认对整数进行处理
// 3. 隔4个拆开
// 4. 对拆分后的每个数据依次填充上 千百十
// 5. 对4中得到的数据进行组装
// 6. 判断输入值是否为浮点型(有小数部分)
// 7. 对小鼠部分replace掉最后的0
// 8. 替换掉1-9然后依次输出即可













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
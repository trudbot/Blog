---
date: '2024-08-02 14:52:59'
title: homework1
lastUpdated: '2024-08-02 14:52:59'
---
## 校验银行卡号

### 题意

校验银行卡号算法的步骤如下

1. 从银行卡号倒数第二个数开始向左， 每隔一个数字就将数字乘以二， 比如`[3, 8, 3, 2, 4]` 结果是 `[3, 16, 3, 4, 4]`
2. 将第一步中得到的列表中， 每个元素的数位和加起来， 比如`[3, 16, 3, 4, 4]`结果为`3 + 1 + 6 + 3 + 4 + 4 = 21`
3. 将第二步的结果模10， 比如`21 mod 10 = 1`

4. 如果第三步的结果为`0`， 则银行卡号有效， 否则无效

### 参考代码

```haskell
-- 将一个元素加入列表的末尾
append :: [Integer] -> Integer -> [Integer]
append [] x = [x]
append (x:xs) y = x : append xs y

-- 反转列表
listRev :: [Integer] -> [Integer]
listRev [] = []
listRev (x : xs) = append (listRev xs) x

-- toDigitsRev 1234 == [4,3,2,1]
toDigitsRev :: Integer -> [Integer]
toDigitsRev n
  | n <= 0 = []
  | otherwise = (n `mod` 10) : toDigitsRev (n `div` 10)

-- toDigits 1234 == [1,2,3,4]
-- toDigits 0 == []
-- toDigits (-17) == []
toDigits :: Integer -> [Integer]
toDigits n = listRev (toDigitsRev n)

-- 正序的每隔两个元素乘以2， 比反序更好处理
doubleEveryOtherFromStart :: [Integer] -> [Integer]
doubleEveryOtherFromStart [] = []
doubleEveryOtherFromStart [x] = [x]
doubleEveryOtherFromStart (x : y : zs) = x : (y * 2) : doubleEveryOtherFromStart zs

-- 反序的每隔两个元素乘以2
-- doubleEveryOther [8,7,6,5] == [16,7,12,5]
-- doubleEveryOther [1,2,3] == [1,4,3]
doubleEveryOther :: [Integer] -> [Integer]
doubleEveryOther list = listRev (doubleEveryOtherFromStart (listRev list))

getNumberDigitsSum :: Integer -> Integer
getNumberDigitsSum n
  | n <= 0 = 0
  | otherwise = (n `mod` 10) + getNumberDigitsSum (n `div` 10)

-- 求列表中每个数字都数位和之和
-- sumDigits [16,7,12,5] == 22
sumDigits :: [Integer] -> Integer
sumDigits [] = 0
sumDigits (x : xs) = getNumberDigitsSum x + sumDigits xs

-- 校验银行卡号
-- validate 4012888888881881 == True
-- validate 4012888888881882 = False
validate :: Integer -> Bool
validate n = sumDigits (doubleEveryOther (toDigits n)) `mod` 10 == 0

main = do
  print (toDigits (-17) == [])
  print (toDigits 1234 == [1,2,3,4])
  print (toDigits 0 == [])
  print (toDigitsRev 1234 == [4,3,2,1])
  print (doubleEveryOther [8,7,6,5] == [16,7,12,5])
  print (doubleEveryOther [1,2,3] == [1,4,3])
  print (sumDigits [16,7,12,5] == 22)
  print (validate 4012888888881881)
  print (not (validate 4012888888881882))
```

## 汉诺塔

```haskell
type Peg = String
type Move = (Peg, Peg)
-- hanoi :: Integer -> Peg -> Peg -> Peg -> [Move]
-- 第一个柱子中盘子的数量， 三个柱子的名字， 返回移动的步骤
-- 目的： 将第一个柱子中的盘子移动到第二个柱子上， 使用第三个柱子做辅助
-- hanoi 2 "a" "b" "c" == [("a","c"), ("a","b"), ("c","b")]
hanoi :: Integer -> Peg -> Peg -> Peg -> [Move]
hanoi 1 a b c = [(a, b)]
hanoi n a b c = hanoi (n - 1) a c b ++ [(a, b)] ++ hanoi (n - 1) c b a

main = do
  print (hanoi 2 "a" "b" "c" == [("a","c"), ("a","b"), ("c","b")])
```


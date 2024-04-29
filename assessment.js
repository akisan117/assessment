'use strict';
const userNameImput = document.getElementById(`user-name`)
const assessmentButton = document.getElementById('assessment')
const resultDivision = document.getElementById('result-area')
const tweetDivision = document.getElementById('tweet-area')

userNameImput.addEventListener(
  'keydown',
  (e) => {
    if (e.key === "Enter"){
      assessmentButton.dispatchEvent(new Event('click'))
    }
  }
)


assessmentButton.addEventListener(
  'click',
  () => {
    return main();
  }
);

function main() {
    const userName = userNameImput.value;
    if (userName.length === 0) {
      // 名前が空の時は処理を終了する
      return;
    }

    // 診断結果エリア
    resultDivision.innerText = '';
    const headerDivision = document.createElement('div');
    headerDivision.setAttribute('class', 'card-header text-bg-primary');
    headerDivision.innerText = '診断結果'

    const bodyDivision = document.createElement('div');
    bodyDivision.setAttribute('class', 'card-body');

    const paragraph = document.createElement('p');
    paragraph.setAttribute('class', 'card-text');
    const result = assessment(userName);
    paragraph.innerText = result;
    bodyDivision.appendChild(paragraph);

    //resultDivisionにBootstrapのスタイルを適用
    resultDivision.setAttribute('class', 'card')

    //headerDivisionとbodyDivisionをresultDivisionに差し込み
    resultDivision.appendChild(headerDivision)
    resultDivision.appendChild(bodyDivision)

    // ツイートエリアの作成
    tweetDivision.innerText = '';
    const anchor = document.createElement('a');
    const hrefValue =
      'https://twitter.com/intent/tweet?button_hashtag=' +
      encodeURIComponent('あなたのいいところ') +
      '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivision.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivision.appendChild(script);
}

const answers = [
  '###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
  '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
  '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
  '###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
  '###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
  '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
  '###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
  '###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
  '###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
  '###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',
  '###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
  '###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
  '###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
  '###userName###のいいところはその全てです。ありのままの###userName###自身がいいところなのです。',
  '###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。'
]

/**
 * 名前文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */

function assessment(userName) {
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  const index = sumOfCharCode % answers.length;
  let result = answers[index];
  result = result.replaceAll('###userName###', userName);
  return result;
}

//テストを行う関数
function test() {
  console.log('▼ユーザーネーム置き換えテスト開始');

  //太郎
  console.log('太郎');
  console.assert(
    assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません'
  )

  //次郎
  console.log('次郎');
  console.assert(
    assessment('次郎') === '次郎のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる次郎が皆から評価されています。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません'
  )

  //花子
  console.log('花子');
  console.assert(
    assessment('花子') === '花子のいいところはまなざしです。花子に見つめられた人は、気になって仕方がないでしょう。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません'
  )

  console.log('┗ユーザーネーム置き換えテスト終了');

  console.log('▼同一ユーザーネーム画一化テスト開始');
  //三郎
  console.log('太郎');
  console.assert(
    assessment('三郎') === assessment('三郎'),
    '同じユーザーネームに対して同じ結果が出力されていません'
  )

  //さくら
  console.log('さくら');
  console.assert(
    assessment('さくら') === assessment('さくら'),
    '同じユーザーネームに対して同じ結果が出力されていません'
  )

  console.log('┗同一ユーザーネーム画一化テスト終了');
}

test();

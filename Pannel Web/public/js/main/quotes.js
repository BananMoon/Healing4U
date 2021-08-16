const quotes = [
    {
        quote: `흔들리지 않고 피는 꽃이 어디 있으랴
        이 세상 그 어떤 아름다운 꽃들도 다 흔들리면서 피었나니`,
        author: "<흔들리며 피는 꽃> 中 - 도종환"
    },
    {
        quote:`그 누구도 나를 응원해주지 않는다면
        내가 나를 응원하면 되는 일이다.
        내가 나를 가장 잘 아니까, 얼마나 열심이었는지를.`,
        author:"<#너에게> 中 - 완글"
    },
    {
        quote:`지금 이렇게 버티고 나아가고 있는 것만으로도
        대단한 일을 하고 있는 걸요.
        대신 힘들지만 잘 살아내줘서 고맙다고,
        대견하다고 말해주세요. 수고했어요 오늘도.`,
        author:"<예쁜 것은 다 너를 닮았다> 中"
    },
    {
        quote:`그동안의 노력을 돌아봐 주자. 
        당신은, 생각보다 먼 길을 달려왔다.
        바람도 쉬고 햇살도 쉬고 별들도 쉰다.
        당신도 쉬어가길 바란다.`,
        author:"<아무것도 아닌 지금은 없다> 中"
    },
    {
        quote:`지금 삶이 힘든 당신, 이 세상에 태어난 이상
        당신은 모든 걸 매일 누릴 자격이 있어요.
        대단하지 않은 하루가 지나고, 
        또 별 것 아닌하루가 온다 해도 인생은 살 가치가 있습니다.
        후회 가득한 과거와 불안하기만 한 미래 때문에
        지금을 망치지 마세요.
        오늘을 살아가세요. 눈이 부시게.`,
        author:"<눈이부시게> 中"
    },
    {
        quote:`거저 얻어지는 건 거의 없다.
        어두운 곳의 빛이 더 밝고,
        혹독한 겨울 뒤에 오는 봄이 유난히 따뜻하다.
        깨진 곳에 빛이 머물고, 깨진만큼 더 반짝인다.`,
        author:"<여자 서른다섯, 그런대로 안녕하다> 中"
    },
    {
        quote:`오늘 밤엔 고생했던 나에게 먼저 말을 건네봐요.
        다른 것보다 나에게 집중해서
        오늘은 어떤 일이 힘들었고
        즐거웠던 일은 무엇인지 가만히 들어주세요.`,
        author:"<괜찮아, 사랑이야> 中"
    },
    {
        quote:`잘하고 싶었는데, 마음처럼 안돼서
        내가 싫었던 날이 있나요?
        괜찮아요, 잘하고 싶다는 마음만으로도
        당신은 좋은 사람이에요.`,
        author: "<오늘처럼 내가 싫었던 날은 없었다> 中"
    },
    {
        quote: `네가 겪는 숱한 저항과 매서운 바람들은 네 잘못이 아니란다. 
        흔들리면서도 봉우리를 틔워줘서 고마워.`,
        author: " <예쁜 것은 다 너를 닮았다> 中"
    },
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

todaysQuote = quotes[Math.floor(Math.random()*quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;
document.body.img.appendChild(quote);
document.body.img.appendChild(author);
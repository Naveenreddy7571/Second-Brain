export function random(len:number):string
{
    let options:string = "qwertyuiopasdfghjklzxcvbnm1234567890";
    let n = options.length;
    let ans=""

    for(let i=0;i<len;i++)
    {
        ans+=options[Math.floor(Math.random() * n)];
    }
    return ans;
}
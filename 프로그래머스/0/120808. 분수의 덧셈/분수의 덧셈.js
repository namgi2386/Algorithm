function gcd(a,b){
    while(b !== 0){
        let r = a%b
        a = b
        b = r
    }
    return a // 최대공약수
}
function solution(numer1, denom1, numer2, denom2) {
    const nd1 = gcd(numer1,denom1);
    const nd2 = gcd(numer2,denom2);
    numer1 /= nd1
    denom1 /= nd1
    numer2 /= nd2
    denom2 /= nd2
    const fdenom = gcd(denom1 , denom2)
    let fcdenom = (denom1*denom2)/fdenom
    let fcnumer = (numer2*denom1 + numer1*denom2)/fdenom
    const lnd = gcd(fcdenom,fcnumer)
    fcdenom /= lnd
    fcnumer /= lnd
    return [fcnumer , fcdenom];
};
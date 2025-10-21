#include <bits/stdc++.h>

#define all(x) (x).begin(), (x).end()

#define INF 0x7FFFFFFF

using namespace std;

using ll = long long;
using ld = long double;
using pii = pair<int,int>;
using pll = pair<ll, ll>;

ll gcd(ll a, ll b)
{
    if (!b) return a;
    return gcd(b, a % b);
}

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);

    int m;
    cin >> m;
    int ans = m*m*(m + 3*(60-m));
    int b = 60 * 60 * 60;

    cout << ans / gcd(ans, b) << "/" << b / gcd(ans, b);

    return 0;
}
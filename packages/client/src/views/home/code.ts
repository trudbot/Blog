const code: string = `#include <bits/stdc++.h>
using namespace std;
using ll = long long;
const int N = 1e5 + 10;
ll a[N], f[N << 2], v[N << 2];

void pushup(int k) {
    f[k] = f[2 * k] + f[2 * k + 1];
}

void pushdown(int k, int l, int r) {
    if (v[k]) {
        int left = 2 * k, right = left + 1, m = (l + r) >> 1;
        f[left] += v[k] * (m - l + 1), f[right] += v[k] * (r - m);
        v[left] += v[k], v[right] += v[k], v[k] = 0;
    }
}

void build(int k, int l, int r) {
    if(l == r) {
        f[k] = a[l];
        return;
    }
    int m = (l + r) >> 1;
    build(2 * k, l, m), build(2 * k + 1, m + 1, r);
    pushup(k);
}

void modify (int k, int l, int r, int b, int e, int s) {
    if(l == b && e == r) {
        f[k] += (r - l + 1) * s;
        v[k] += s;
        return;
    }
    pushdown(k, l, r);
    int m = (l + r) >> 1;
    if (e <= m) {
        modify(2 * k, l, m, b, e, s);
    } else if (b > m) {
        modify(2 * k + 1, m + 1, r, b, e, s);
    } else {
        modify(2 * k, l, m, b, m, s), modify(2 * k + 1, m + 1, r, m + 1, e, s);
    }
    pushup(k);
}

ll query(int k, int l, int r, int b, int e) {
    if (l == b && e == r) {
        return f[k];
    }
    pushdown(k, l, r);
    int m = (l + r) >> 1;
    ll res;
    if (e <= m) {
        res = query(2 * k, l, m, b, e);
    } else if (b > m ) {
        res = query(2 * k + 1, m + 1, r, b, e);
    } else {
        res = query(2 * k, l, m, b, m) + query(2 * k + 1, m + 1, r, m + 1, e);
    }
    pushup(k);
    return res;
}`;

export default code;

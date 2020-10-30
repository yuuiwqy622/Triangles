#include <stdio.h>

char tr[100][199];

void readTriangles(int n) {
  char c;
  for (int i = 0; i < n; ++i) {
    for (int j = 0; (c = getchar()) != '\n'; ++j) {
      tr[i][j] = c == '-';
    }
  }
}

int min(int a, int b) { return a < b ? a : b; }

int max(int a, int b) { return a > b ? a : b; }

void printArea(int n) {
  int m = (n - 1) * 2 + 1;
  int area = 0;

  for (int j = 0; j < m; ++j)
    area = max(area, tr[0][j]);

  /* downward triangles */
  for (int i = 1; i < n; ++i)
    for (int j = i; j < m - i; j += 2) {
      if (tr[i][j] && tr[i - 1][j]) {
        tr[i][j] = min(tr[i - 1][j - 1], tr[i - 1][j + 1]);
        ++tr[i][j];
      }

      area = max(area, tr[i][j]);
    }

  /* upward triangles */
  for (int j = n - 3; n > 3 && j < m - n + 2; ++j) {
    tr[n - 3][j] = tr[n - 3][j] > 0;
  }

  for (int i = n - 4; n > 3 && i >= 0; --i)
    for (int j = i + 3; j < n + n - i - 3; j += 2) {
      if (tr[i][j] && tr[i + 1][j]) {
        tr[i][j] = min(tr[i + 1][j - 1], tr[i + 1][j + 1]);
        ++tr[i][j];
      }

      area = max(area, tr[i][j]);
    }

  printf("The largest triangle area is %d.\n\n", area * area);
}

int main(void) {
  int n;
  for (int i = 1;; ++i) {
    scanf("%d\n", &n);
    if (!n)
      return 0;

    readTriangles(n);
    printf("Triangle #%d\n", i);
    printArea(n);
  }

  return 0;
}
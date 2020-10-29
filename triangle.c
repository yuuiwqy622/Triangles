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

void printArea(int n) {}

int main(void) {
  int n;
  while (1) {
    scanf("%d\n", &n);
    if (!n)
      return 0;

    readTriangles(n);
    printArea(n);
  }

  return 0;
}
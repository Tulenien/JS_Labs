ok.
fib(F1,F2,A, B):- F1 > B.
fib(F1, F2, A, B):- F1 < A, F3 is F1 + F2, fib(F2, F3, A, B).
fib(F1, F2, A, B):- write(F1), nl, F3 is F1 + F2, fib(F2, F3, A, B).
input(A, B) :- read(A), read(B); ok.
f :- input(A, B), fib(0, 1, A, B), ok.






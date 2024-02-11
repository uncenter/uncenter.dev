---
title: Learning Fortran
description: How hard could learning the oldest computer programming language be?
tags: ['fortran']
date: 2024-01-31
comments: true
---

While I probably should be learning a language like C, Go, or whatever new trendy language the [ThePrimeagen](https://twitter.com/ThePrimeagen) mentions on Twitter (OCaml?), I'm going to attempt to learn Fortran.

::: note
Ironically, in the ~3-ish months since I started writing this article, ThePrimagen has recently ["take[n] back everything i said about FORTRAN"](https://x.com/ThePrimeagen/status/1745542049284423973) and apparently has some interest in the language!
:::

## A quick history

Fortran, which stands for FORmula TRANslator[^1], was created at IBM by [John Backus](https://en.wikipedia.org/wiki/John_Backus) in 1957 for scientific applications and has apparently been popular for high-performance computing and benchmarking supercomputers in recent years. Fortran has had several subsequent releases since then; FORTRAN 77, Fortran 90, Fortran 95, Fortran 2003, Fortran 2008, and the latest Fortran 2018.

## Which version of Fortran?

To understand what version of Fortran to learn/use, we first must understand the difference between _fixed form_ and _free form_ Fortran. The fixed form layout comes from the very beginning of Fortran, inherited from punch cards, and has odd restrictions about the column in which comments and statements are placed. You can read more about [the fixed form layout](https://fortranwiki.org/fortran/show/Fixed+form+layout) on the Fortran Wiki. The free form layout, first introduced in Fortran 90, removed special columns and added the ability to write comments wherever, and is what we'll be learning in this article. With GNU Fortran (`gfortran`) — the compiler we'll be using here — fixed form and free form layouts are distinguished by the file extension. The default version is FORTRAN 77 (fixed form) and to use the free form layout, set the file extension to `.f90` or newer. A common misconception is that `.f90` means the code is Fortran 90, but it is actually just standard practice and tells the compiler to use the free form layout. I'll leave it to the following [comment on the Fortran discussion board](https://fortran-lang.discourse.group/t/is-there-a-standard-file-suffix-for-modern-fortran-code/3550/2) to explain it better than I ever could:

> The .f90 suffix means that the source code is free format, not that
> the code conforms to the Fortran 90 standard. Code that uses the .f90
> suffix can use features from any Fortran standard. All Fortran
> compilers recognize .f90 as a suffix indicating free source form, but
> some may not recognize a suffix such as .f95, .f03, .f08, or .f18.
> Some users may have build tools that do not recognize suffixes other
> than .f90. Most Fortran source code on GitHub that uses features from
> a standard more recent than Fortran 90 still uses the .f90 suffix.

::: tip
As I just mentioned, we will be using `gfortran` later on to compile our code, so make sure to have it installed! You can install it via Homebrew (macOS) with the [`gcc`](https://formulae.brew.sh/formula/gcc#default) formula, or [install it from a package manager for your OS](https://gcc.gnu.org/wiki/GFortranDistros).
:::

## Understanding the syntax

Coming from TypeScript, and before that, Python, I'm very used to (and comfortable with) modern - you might say "aesthetic" - syntax . Although I wouldn't say Fortran syntax is quite _modern_, it seems to avoid the syntactic sugar nightmares that plague beginners in other languages[^2]. Take a look at this `helloworld.f90` example below.

```f90
program helloworld

  print *, 'Hello, world!'

end program helloworld
```

<!-- spell-checker:disable --->
<script>
	 window.addEventListener("DOMContentLoaded", () => {
		const screamingCaseToggle = document.querySelector('#toggle-screaming-case');
		let screamingCaseEnabled = JSON.parse(localStorage.getItem("screaming-case-mode-enabled")) || false;

		function updateScreamingCaseStatus() {
			localStorage.setItem("screaming-case-mode-enabled", screamingCaseEnabled)
			screamingCaseToggle.textContent = screamingCaseEnabled ? 'Disable SCREAMING_CASE mode' : 'Enable SCREAMING_CASE mode';
			for (const token of document.querySelectorAll('.code-block span.line span')) {
				if (token.getAttribute('style') === '--shiki-light:#D73A49;--shiki-dark:#F97583') {
					token.textContent = screamingCaseEnabled ? token.textContent.toUpperCase() : token.textContent.toLowerCase();
				}
			}
		}

		updateScreamingCaseStatus();

		screamingCaseToggle.addEventListener('click', () => {
			screamingCaseEnabled = !screamingCaseEnabled;
			updateScreamingCaseStatus();
		});
	});
</script>
<!-- spell-checker:enable --->

::: note
Older Fortran programs required the use of [SCREAMING_CASE](https://en.wiktionary.org/wiki/screaming_snake_case) for all keywords, but in modern Fortran you can and [it is recommended](https://fortran-lang.org/learn/best_practices/style_guide/) to use lowercase (you can still use SCREAMING_CASE or any other case you want though).

<button id="toggle-screaming-case">Enable SCREAMING_CASE mode</button>
:::

Just from this small example we can gather that...

-   Every Fortran program begins with `program <program-name>` and ends with `end program <program-name>`.
-   To display text on the terminal we use `print *, '<message>'`.

::: note
I can't find exactly where this is documented but you don't actually need the start and end `program <program-name>` — you could write a hello world program like this, though as I just mentioned this doesn't seem to be a common practice and isn't really very useful in any practical scenario.

```f90
print *, 'Hello, world!'; end
```

:::

And before we go any further, you should know that comments begin with an exclamation mark.

```f90
program comments
  ! I am a Fortran comment.
end program comments
```

Here's another, slightly more complicated example.

```f90
program calculator
  implicit none

  real :: x, y, answer
  character(1) :: choice

  print *, 'x:'
  read *, x
  print *, 'y:'
  read *, y

  print *, '+, -, *, /:'
  read *, choice
  if (choice == '+') then
    answer = x + y
  end if
  if (choice == '-') then
    answer = x - y
  end if
  if (choice == '*') then
    answer = x * y
  end if
  if (choice == '/') then
    answer = x / y
  end if

  print *, 'Answer:', answer

end program calculator
```

Starting right at the top, we have something new: `implicit none`. This is important to use in all future programs that you write.

> In Fortran, by default the type of variables whose names start with `I...N` is `INTEGER`, and `REAL` otherwise. It is a legacy of the past and it is know strongly advised to put an `implicit none` statement in your program and in each module. ([implicit none - Fortran Wiki](https://fortranwiki.org/fortran/show/implicit+none))

Added in Fortran 90, `implicit none` disables implicit typing defaults and all variables must be explicitly declared. `implicit none` needs to precede the rest of your program, so make sure to put it at the top. A common Fortran joke goes along the lines of “GOD is REAL, unless declared INTEGER," as with implicit typing, variables with names starting with the letters I through N are implicitly `INTEGER`, all others are implicitly `REAL` - the first letter of "GOD", a "G", is not within I - N and is therefore of the REAL type.

Moving on, we declare our first variables in this program.

```f90
real :: x, y, answer
character(1) :: choice
```

Here we are declaring `x`, `y`, and `answer` with the `real` type, and `choice` with the `character` type. The `real` type stores floating point numbers[^3], and `character` stores characters.

Next, we prompt the user for our `x` and `y` values.

```f90
print *, 'x:'
read *, x
print *, 'y:'
read *, y
```

Notice how we can take input from the user with `read` and assign it to a value with the `read *, <variable>` syntax.

We do the same for prompting the user to select an operation.

```f90
print *, '+, -, *, /:'
read *, choice
```

Finally, we use a series of basic if-statements to calculate our answer and display it in the terminal.

```f90
if (choice == '+') then
  answer = x + y
end if
if (choice == '-') then
  answer = x - y
end if
if (choice == '*') then
  answer = x * y
end if
if (choice == '/') then
  answer = x / y
end if

print *, 'Answer:', answer
```

If we run this, we- wait. Did I even tell you how to compile a Fortran program yet?

## How do I actually run this sh\*t?

To compile our `calculator.f95` program, run `gfortran -o calculator calculator.f95` . To run our program, simply run `./calculator`. If you only instruct `gfortran` of the input file, the default output executable will be named `a.out`.

Let's run our program now.

```
$ gfortran -o calculator calculator.f95
$ ./calculator
 x:
10
 y:
2
 +, -, *, /:
*
 Answer:   20.0000000
```

Pretty cool, huh?

## A few improvements

Our calculator isn't perfect yet though. What if the user tries to divide by zero?

```
 x:
10
 y:
0
 +, -, *, /:
/
 Answer:         Infinity
```

Probably not the answer you expected. Let's try to fix that.

```f90
if (choice == '/') then
  if (y /= 0.0) then
    answer = x / y
  else
    print *, 'Error: Division by zero is not allowed.'
	stop
  end if
end if
```

Here we use the inequality operator, `/=`, to check if the `y` value is zero. Now, if the user tries to divide by zero, we'll print an error message and use the `stop` statement to end the program.

Great. We got rid of the zero division mess, but our code isn't pretty at all. Who wants a bunch of if statements? We can simplify this using the `select case` statement (also known as the `case` statement).

```f90
select case (choice)
  case ('+')
    answer = x + y
  case ('-')
    answer = x - y
  case ('*')
    answer = x * y
  case ('/')
    if (y /= 0.0) then
      answer = x / y
    else
      print *, 'Error: Division by zero is not allowed.'
      stop
    end if
  case default
    print *, 'Invalid choice. Please choose +, -, *, or /.'
    stop
end select
```

This also has the handy benefit of telling the user if they made an invalid choice while selecting the operation.

So there we have it! A quick introduction to modern Fortran; declaring variables, printing and reading to and from the terminal, `if` and `select case`, and `stop`.

[^1]: According to sources listed on [Fortran's Wikipedia](https://en.wikipedia.org/wiki/Fortran), the name might also have stood for _Formula Translating System_ or just _Formula Translation_.
[^2]: See [The Rust programming language absolutely positively sucks : r/rust](https://www.reddit.com/r/rust/comments/12b7p2p/the_rust_programming_language_absolutely/) and [Rust is a nightmare to learn coming from Java - community - The Rust Programming Language Forum](https://users.rust-lang.org/t/rust-is-a-nightmare-to-learn-coming-from-java/37650).
[^3]: You can also use `double precision` for larger (more precise) floating point numbers.

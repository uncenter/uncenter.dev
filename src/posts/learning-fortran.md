---
title: Learning Fortran
description: How hard could learning the oldest computer programming language be?
tags: ['fortran']
date: 2024-01-31
comments: true
---

While I probably should be learning a language like C, Go, or whatever new trendy language the [ThePrimeagen](https://twitter.com/ThePrimeagen) mentions on Twitter (OCaml?), I'm going to attempt to learn Fortran[^1].

## A quick history

Fortran, which stands for FORmula TRANslator[^2], was created at IBM by [John Backus](https://en.wikipedia.org/wiki/John_Backus) in 1957 for scientific applications and has apparently been popular for high-performance computing and benchmarking supercomputers in recent years. Fortran has had several subsequent releases since then; FORTRAN 77, Fortran 90, Fortran 95, Fortran 2003, Fortran 2008, and the latest Fortran 2018.

## Which version of Fortran?

To understand what version of Fortran to learn/use, we first must understand the difference between _fixed form_ and _free form_ Fortran. The [fixed form layout](https://fortranwiki.org/fortran/show/Fixed+form+layout) comes from the very beginning of Fortran, inherited from punch cards, and has odd restrictions about the column in which comments and statements are placed. The free form layout, first introduced in Fortran 90, removed special columns and added the ability to write comments wherever, and is what we'll be learning in this article. The compiler we'll be using is GNU Fortran, or `gfortran`. You can install it via Homebrew (macOS) with the [`gcc`](https://formulae.brew.sh/formula/gcc#default) formula, or [install it using a package manager for your OS](https://gcc.gnu.org/wiki/GFortranDistros). To tell `gfortran` that your code uses the free form layout, set the file extension to `.f90` or newer. The following [comment on the Fortran discussion board](https://fortran-lang.discourse.group/t/is-there-a-standard-file-suffix-for-modern-fortran-code/3550/2) explains this well.

> The .f90 suffix means that the source code is free format, not that
> the code conforms to the Fortran 90 standard. Code that uses the .f90
> suffix can use features from any Fortran standard. All Fortran
> compilers recognize .f90 as a suffix indicating free source form, but
> some may not recognize a suffix such as .f95, .f03, .f08, or .f18.
> Some users may have build tools that do not recognize suffixes other
> than .f90. Most Fortran source code on GitHub that uses features from
> a standard more recent than Fortran 90 still uses the .f90 suffix.

## Understanding the syntax

Coming from TypeScript, and before that, Python, I'm very used to (and comfortable with) modern — you might say "aesthetic" — syntax . Although I wouldn't say Fortran syntax is quite _modern_, it seems to avoid the syntactic sugar nightmares that plague beginners in other languages[^3]. Take a look at this `helloworld.f90` example below.

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
				if (token.getAttribute('style') === '--shiki-latte:#8839EF;--shiki-frappe:#CA9EE6;--shiki-macchiato:#C6A0F6;--shiki-mocha:#CBA6F7') {
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
Older Fortran programs required the use of [SCREAMING_CASE](https://en.wiktionary.org/wiki/screaming_snake_case) for all keywords, but in modern Fortran you can and [it is recommended](https://fortran-lang.org/learn/best_practices/style_guide/) to use [snake_case](https://en.wiktionary.org/wiki/snake_case#English) (you can still use SCREAMING_CASE or any other case you want though).

<button id="toggle-screaming-case">Enable SCREAMING_CASE mode</button>
:::

Just from this small example we can gather that...

-   Every Fortran program begins with `program <program-name>` and ends with `end program <program-name>`.
-   To display text on the terminal we use `print *, '<message>'`.

The syntax for printing is a little funky though. What is that asterisk doing there? The asterisk, aside from being used as a mathematical operator, indicates the "default". So for `print`, `*` means "print to the default output channel" (or "print to the default output file unit" to be precise), which is typically going to be STDOUT.

::: note
I can't find exactly where this is documented but you don't actually need the start and end `program <program-name>`; you could write a hello world program like this, though as I just mentioned this doesn't seem to be a common practice and isn't really very useful in any practical scenario.

```f90
print *, 'Hello, world!'; end
```

:::

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

Starting right at the top, we have something new: `implicit none`. Added in Fortran 90, `implicit none` disables implicit typing defaults and all variables must be explicitly declared. In Fortran, implicit typing is the practice of assigning default types to variables based on the character a variable name begins with. Variables starting with `I` through `N` are `INTEGER`s, everything else is `REAL`. It is "a legacy of the past" and usage of an `implicit none` statement is "strongly advised" ([implicit none - Fortran Wiki](https://fortranwiki.org/fortran/show/implicit+none)).

::: note
A common Fortran joke goes along the lines of “GOD is REAL, unless declared INTEGER"[^4] because of implicit typing!
:::

Moving on, we declare our first variables in this program.

```f90
real :: x, y, answer
character(1) :: choice
```

Here we are declaring `x`, `y`, and `answer` with the `REAL` type, and `choice` with the `CHARACTER` type. The `REAL` type stores floating point numbers[^5], and `CHARACTER`... stores characters.

Next, we prompt the user for our `x` and `y` values.

```f90
print *, 'x:'
read *, x
print *, 'y:'
read *, y
```

Notice how we can take input from the user with `read` and assign it to a value with the `read *, <variable>` syntax. The asterisk here means _read_ from the default input channel/file unit, which would be STDIN.

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

## How do I actually run this?

First, compile our calculator program with `gfortran -o calculator calculator.f90` . Then you can run it with `./calculator`. If you only instruct `gfortran` of the input file (`gfortran calculator.f90`), the default output executable will be named `a.out`.

Let's run our program now.

```
$ gfortran -o calculator calculator.f90
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

That’s just a quick introduction to a few modern Fortran features: declaring variables, printing and reading to and from the terminal, `if` and `select case`, and `stop`. Next time, we’ll talk more about where Fortran is actually used, cooler things _you_ can build with it, and how the Fortran language & community are rapidly modernizing!

[^1]: Ironically, in the ~3-ish months since I started writing this article, ThePrimagen has recently said he ["take[s] back everything i said about FORTRAN"](https://x.com/ThePrimeagen/status/1745542049284423973) — apparently having some interest in the language!
[^2]: According to sources listed on [Fortran's Wikipedia](https://en.wikipedia.org/wiki/Fortran), the name might also have stood for _Formula Translating System_ or just _Formula Translation_.
[^3]: See [The Rust programming language absolutely positively sucks : r/rust](https://www.reddit.com/r/rust/comments/12b7p2p/the_rust_programming_language_absolutely/) and [Rust is a nightmare to learn coming from Java - community - The Rust Programming Language Forum](https://users.rust-lang.org/t/rust-is-a-nightmare-to-learn-coming-from-java/37650).
[^4]: The first letter of "GOD", a "G", is not within I through N and is therefore of the `REAL` type ("GOD is REAL").
[^5]: You can also use `double precision` for larger (more precise) floating point numbers.

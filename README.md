# react-redux-jest-enzyme
A snippet from my internal project of how front-end testing and folder structure are done. From an apprentice in testing environment.
Might be headache inducing due to ugliness :)

__This will not run in browser because there are other components which are not included.__

### How to Run the test

1. `yarn install`
2. `npm run test`

This should be equipped with 100% coverage.

### Idea

I read [an article in here](https://medium.com/@TuckerConnelly/simplifying-redux-architecture-cd50426c941a#.51e8pssv8)
about how your usual redux structure is awful. To be honest he's quite right, so I'm trying his idea about
co-locating similar redux components. For example, all `getAnnouncements` are included inside one file instead of
separating them one by one. In a glance it might seem to be cluttered but in the long run I think it's useful when compared
to opening multiple files just to adjust a data model for example.

### Why Jest

Jest 15 is fast. Really. I also love the snapshot thing - it makes my SAN points still high enough when making tests.  
It is also a GOAT test environment. Instead of using multiple things like `karma`, `mocha`, `chai`, and `enzyme` to run the test,
we now only have `jest` to do all of those things. It's fun, really. Also it's not a hassle in integrating Babel.

I have also tried `ava` but it is still a mess when doing coverage, and [there are reports that `ava` is slow for big
amount of tests](https://medium.com/@kentcdodds/migrating-to-jest-881f75366e7e#.v6efuj6dx). So, taking the safe route,
I decided to use `jest` instead of continuing with `ava`.

So that's it. If you see any stupidity or wtf moments during seeing my code, please tell me so. As I've said before, I'm new to testing
world so it is gonna be headache inducing later on. I hope not, but it usually is. Good day!

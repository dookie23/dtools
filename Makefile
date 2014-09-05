nyantest:
	./node_modules/.bin/mocha --reporter nyan

 .PHONY: nyantest

test:
	./node_modules/.bin/mocha --reporter spec

 .PHONY: test
# Selection and Range

## Range
The basic concept of selection is Range, that is essentially a pair of “boundary points”: range start and range end.

A Range object is created without parameters:

```js
let range = new Range();
```

Then we can set the selection boundaries using ```range.setStart(node, offset)``` and ```range.setEnd(node, offset)```.

### Selecting the text partially
The first argument ```node``` in both methods can be either a text node or an element node, and the meaning of the second argument depends on that.

If ```node``` is a text node, then ```offset``` must be the position in its text.

For example, given the element ```<p>Hello</p>```, we can create the range containing the letters “ll” as follows:
```js
range.setStart(ele.firstChild,2);
range.setEnd(ele.firstChild,4);

document.getSelection().addRange(range);
```

### Selecting element nodes
Alternatively, if ```node``` is an element node, then ```offset``` must be the child number.

That’s handy for making ranges that contain nodes as a whole, not stop somewhere inside their text.

For example, we have a more complex document fragment:
```<p id="p">Hello <b>this</b> is new <i>text</i>.</p>```
```js
range.setStart(ele,2);
range.setEnd(ele,4);
document.getSelection().addRange(range);
```

### Selecting a bigger fragment
We need to create a range, that:

- starts from position 2 in ```<p>``` first child (taking all but two first letters of "Hello")
- ends at the position 3 in ```<i>``` first child (taking first two letters, but no more):

```js
range.setStart(ele.firstChild,2);
range.setEnd(ele.querySelector('i').firstChild,2);
document.getSelection().addRange(range);
```

### Range properties
The range object that we created in the example above has following properties:

- ```startContainer```, ```startOffset``` – node and offset of the start,
> - in the example above: first text node inside ```<p>``` and 2.
- ```endContainer```, ```endOffset``` – node and offset of the end,
> - in the example above: first text node inside ```<i>``` and 3.
- ```collapsed``` – boolean, true if the range starts and ends on the same point (so there’s no content inside the range),
> - in the example above: false
- ```commonAncestorContainer``` – the nearest common ancestor of all nodes within the range,
> - in the example above: <p>


### Range selection methods
There are many convenient methods to manipulate ranges.

Set range start:

- ```setStart(node, offset)``` set start at: position offset in node
- ```setStartBefore(node)``` set start at: right before node
- ```setStartAfter(node)``` set start at: right after node

Set range end (similar methods):

- ```setEnd(node, offset)``` set end at: position offset in node
- ```setEndBefore(node)``` set end at: right before node
- ```setEndAfter(node)``` set end at: right after node

Technically, setStart/setEnd can do anything, but more methods provide more convenience.

Even more methods to create ranges:

- ```selectNode(node)``` set range to select the whole node
- ```selectNodeContents(node)``` set range to select the whole node contents
- ```collapse(toStart)``` if toStart=true set end=start, otherwise set start=end, thus collapsing the range
- ```cloneRange()``` creates a new range with the same start/end

Ex:-
```js
range.setStartAfter(ele.firstChild);
range.setEndBefore(ele.querySelector('i'));
document.getSelection().addRange(range);


range.selectNode(ele);
range.selectNodeContents(ele)
document.getSelection().addRange(range);


let newrange=range.cloneRange();

document.getSelection().addRange(newrange);
```

### Range editing methods
Once the range is created, we can manipulate its content using these methods:

- ```deleteContents()``` – remove range content from the document
```js
range.setStart(ele.firstChild,2);
range.setEnd(ele.querySelector('i').firstChild,2);
range.deleteContents();
``` 
- ```extractContents()``` – remove range content from the document and return as DocumentFragment
```js
range.setStart(ele.firstChild,2);
range.setEnd(ele.querySelector('i').firstChild,2);
console.log(range.extractContents());
```
Output:-
```
DocumentFragment(4) [ #text, b, #text, i ]
```
- ```cloneContents()``` – clone range content and return as DocumentFragment
```js
range.setStart(ele.firstChild,2);
range.setEnd(ele.querySelector('i').firstChild,2);
let newrange1=range.cloneContents();
console.log(newrange1);
```
- ```insertNode(node)``` – insert node into the document at the beginning of the range
```js
range.setStart(ele.firstChild,2);
range.setEnd(ele.querySelector('i').firstChild,2);

let newele=document.createElement('u')
newele.innerHTML="new text"
range.insertNode(newele);
```
- ```surroundContents(node)``` – wrap node around range content. For this to work, the range must contain both opening and closing tags for all elements inside it: no partial ranges like ```<i>abc```.
```js
range.selectNode(ele.querySelector('i').firstChild)

let newele=document.createElement('u')
newele.innerHTML="new text"
range.surroundContents(newele);
```
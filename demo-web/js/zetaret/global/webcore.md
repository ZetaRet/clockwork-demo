> __Author: Zeta Ret__  
> __Zeta Ret Web Core__  
# basic web core with animation, extendability, global properties, selectors and canvas  
> *Version: 1.3.0*  
> *Date: 2013 - Today*  

__required*__

## zetaret.global::webcore  

### *Properties*  

#  
__doc__ HTMLDocument  
default doc,   

#  
__params__ Object  
default params,   

#  
__canvas__ Array  
default [],   

#  
__autoCanvas__ Array  
default [],   

#  
__graphics__ Object  
default {},   

#  
__animation__ Object  
default init,   

#  
__totalImages__ Number  
default 0,   

#  
__tesselation__ Number  
default 0,   

#  
__vertex__ Number  
default 0,   

#  
__stage__ Object  
default init,   

#  
__events__ Object  
default {},   

#  
__G__ Object  
default init,   

#  
__triggers__ Object  
default {},   

#  
__cookieSuffix__ String  
default init,   


##  
### *Methods*  

##  
__ZetaRet\_WebCore(*HTMLDocument* doc, *Object* params) : *void*__  
  
- __doc*__ - __*HTMLDocument*__,   
- __params*__ - __*Object*__,   
> *return __void__*  

##  
__addext(*Function* ext) : *void*__  
  
- __ext*__ - __*Function*__,   
> *return __void__*  

##  
__extend(*Object* d, *Object* t) : *Object*__  
  
- __d*__ - __*Object*__,   
- __t*__ - __*Object*__,   
> *return __Object__*  

##  
__initD(*Number* d) : *void*__  
  
- d - __*Number*__,   
> *return __void__*  

##  
__init() : *Object*__  
  
> *return __Object__*  

##  
__cev(*String* t, *Object* d, *Boolean* b, *Boolean* c) : *Event*__  
create event  
- __t*__ - __*String*__,   
- d - __*Object*__,   
- b - __*Boolean*__,   
- c - __*Boolean*__,   
> *return __Event__*  

##  
__de(*EventTarget* t, *String* e) : *void*__  
dispatch event  
- __t*__ - __*EventTarget*__,   
- __e*__ - __*String*__,   
> *return __void__*  

##  
__ael(*EventTarget* t, *String* e, *Function* f, *String* gid) : *void*__  
add event listener  
- __t*__ - __*EventTarget*__,   
- __e*__ - __*String*__,   
- __f*__ - __*Function*__,   
- gid - __*String*__,   
> *return __void__*  

##  
__relg(*String* gid) : *void*__  
remove event listener from global registry by id  
- __gid*__ - __*String*__,   
> *return __void__*  

##  
__rel(*EventTarget* t, *String* e, *Function* f) : *void*__  
remove event listener  
- __t*__ - __*EventTarget*__,   
- __e*__ - __*String*__,   
- __f*__ - __*Function*__,   
> *return __void__*  

##  
__loadImage() : *Object*__  
  
> *return __Object__*  

##  
__applyParams(*HTMLElement* e, *Object* p) : *HTMLElement*__  
  
- __e*__ - __*HTMLElement*__,   
- __p*__ - __*Object*__,   
> *return __HTMLElement__*  

##  
__ap(*HTMLElement* e, *Object* p) : *HTMLElement*__  
short for applyParams  
- __e*__ - __*HTMLElement*__,   
- __p*__ - __*Object*__,   
> *return __HTMLElement__*  

##  
__loadCanvas(*HTMLElement* parent, *Object* params, *String* sid) : *Object*__  
  
- parent - __*HTMLElement*__,   
- params - __*Object*__,   
- sid - __*String*__,   
> *return __Object__*  

##  
__getDimensions() : *Object*__  
  
> *return __Object__*  

##  
__getStyle(*HTMLElement* e) : *CSSStyleDeclaration*__  
  
- __e*__ - __*HTMLElement*__,   
> *return __CSSStyleDeclaration__*  

##  
__getElement(*String* sel, *HTMLElement* top, *Object* params) : *HTMLElement|HTMLCollection*__  
  
- __sel*__ - __*String*__,   
- top - __*HTMLElement*__,   
- params - __*Object*__,   
> *return __HTMLElement|HTMLCollection__*  

##  
__gel(*String* sel, *HTMLElement* top, *Object* params) : *HTMLElement|HTMLCollection*__  
short for getElement  
- __sel*__ - __*String*__,   
- top - __*HTMLElement*__,   
- params - __*Object*__,   
> *return __HTMLElement|HTMLCollection__*  

##  
__debug(*Object* p) : *Object*__  
  
- __p*__ - __*Object*__,   
> *return __Object__*  

##  
__rck(*String* k) : *String*__  
read cookie  
- __k*__ - __*String*__,   
> *return __String__*  

##  
__wck(*String* k, *String* v, *Number* d) : *Object*__  
write cookie  
- __k*__ - __*String*__,   
- __v*__ - __*String*__,   
- d - __*Number*__,   
> *return __Object__*  

##  
__dck(*String* k) : *Object*__  
delete cookie  
- __k*__ - __*String*__,   
> *return __Object__*  

##  
__initAnimation() : *void*__  
  
> *return __void__*  

##  
__animate(*Object|HTMLElement|Array* e, *Object* p, *Object* ap) : *Object*__  
  
- __e*__ - __*Object|HTMLElement|Array*__,   
- __p*__ - __*Object*__,   
- __ap*__ - __*Object*__,   
> *return __Object__*  

##  
__an(*Object|HTMLElement|Array* e, *Object* p, *Object* ap) : *Object*__  
short for animate  
- __e*__ - __*Object|HTMLElement|Array*__,   
- __p*__ - __*Object*__,   
- __ap*__ - __*Object*__,   
> *return __Object__*  

##  
__setVal(*String|Number* v, *String|Number* nv) : *String|Number*__  
  
- __v*__ - __*String|Number*__,   
- __nv*__ - __*String|Number*__,   
> *return __String|Number__*  

##  
__fitBox(*Number* w, *Number* h, *Number* tw, *Number* th) : *Object*__  
  
- __w*__ - __*Number*__,   
- __h*__ - __*Number*__,   
- __tw*__ - __*Number*__,   
- __th*__ - __*Number*__,   
> *return __Object__*  

##  
__urlParam(*Object* o) : *String*__  
  
- __o*__ - __*Object*__,   
> *return __String__*  

##  
__encParam(*Object* o) : *String*__  
  
- __o*__ - __*Object*__,   
> *return __String__*  

##  
__request(*Object* p) : *XMLHttpRequest*__  
  
- __p*__ - __*Object*__,   
> *return __XMLHttpRequest__*  

##  
__r(*Object* p) : *XMLHttpRequest*__  
short for request  
- __p*__ - __*Object*__,   
> *return __XMLHttpRequest__*  

##  
__updateProgress() : *Object*__  
  
> *return __Object__*  

##  
__onCreate() : *void*__  
  
> *return __void__*  


# jquery-formElements

Custom checkboxes
-------------

```html
<div class="form-element">
    <label class="form-element-label" for="checkbox-name-1">Checkbox</label>
    <div class="form-element-error">Error</div>

    <label for="checkbox-name-1">
      <input id="checkbox-name-1" class="custom-checkbox" type="checkbox" value="" tabindex="2" />
      <span class="text">check me out</span>
    </label>
</div>
```

```javascript
$('input[type=checkbox]').customCheckbox();
```

Custom Radio Buttons
-------------

```html
<div class="form-element">
    <div class="form-element-label">Radio button</div>

    <label for="input_1">
      <input id="input_1" class="custom-radio" type="radio" name="input_agent" value="" checked="checked" tabindex=""/>
      <span class="text">yep</span>
    </label>

    <label for="input_2">
      <input id="input_2" class="custom-radio" type="radio" name="input_agent" value="" tabindex=""/>
      <span class="text">nope</span>
    </label>
</div>
```

```javascript
$('input[type=radio]').customRadio();
```

Custom dropdowns
-------------

```html
<div class="form-element">
    <div class="form-element-label" for="select1">Select</div>
    <div class="form-element-error">Error</div>
    <select id="select1" class="" name="" tabindex="">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
    </select>
</div>
```

```javascript
$('select').dropdown({
  maxItems: 5
});
```

Custom File Inputs
-------------

```html
<div class="form-element">
    <label class="form-element-label" for="input-file">Upload files</label>
    <div class="form-element-error">Error</div>
    <input type="file" id="input-file" name="" data-label="Select files" data-multiple-caption="{n} files selected" multiple />
</div>
```

```javascript
$('input[type=file]').inputfile();
```

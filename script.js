(function(){
  const displayEl = document.getElementById('display');
  const subEl = document.getElementById('subdisplay');
  const buttons = document.querySelectorAll('button.key');

  let current = '0';
  let previous = null;
  let op = null;
  let overwrite = false;

  function render(){
    displayEl.textContent = current;
    if (previous !== null && op) {
      subEl.textContent = `${previous} ${op}`;
    } else {
      subEl.textContent = '';
    }
  }

  function inputDigit(d) {
    if (overwrite) {
      current = d === '.' ? '0.' : d;
      overwrite = false;
    } else {
      if (d === '.' && current.includes('.')) return;
      current = (current === '0' && d !== '.') ? d : current + d;
    }
  }

  function clearAll() {
    current = '0'; previous = null; op = null; overwrite = false;
  }

  function toggleSign() {
    if (current === '0') return;
    current = (current.startsWith('-')) ? current.slice(1) : '-' + current;
  }

  function percentize() {
    const n = parseFloat(current || '0');
    current = String(n / 100);
  }

  function setOperator(nextOp) {
    if (op && previous !== null && !overwrite) {
      const result = compute(previous, op, parseFloat(current));
      previous = result;
      current = String(result);
      overwrite = true;
      op = nextOp;
    } else {
      previous = parseFloat(current);
      op = nextOp;
      overwrite = true;
    }
  }

  function compute(a, operator, b) {
    switch(operator) {
      case '+': return add(a,b);
      case '-': return sub(a,b);
      case '*': return mul(a,b);
      case '/': return div(a,b);
    }
    return b;
  }

  function add(a,b) { return Number((a + b).toPrecision(15)); }
  function sub(a,b) { return Number((a - b).toPrecision(15)); }
  function mul(a,b) { return Number((a * b).toPrecision(15)); }
  function div(a,b) {
    if (b === 0) {
      alert('Error: división entre cero');
      return a;
    }
    return Number((a / b).toPrecision(15));
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const d = btn.getAttribute('data-digit');
      const a = btn.getAttribute('data-action');
      const o = btn.getAttribute('data-op');

      if (d !== null) { inputDigit(d); render(); return; }
      if (a === 'clear') { clearAll(); render(); return; }
      if (a === 'sign') { toggleSign(); render(); return; }
      if (a === 'percent') { percentize(); render(); return; }
      if (a === 'equals') {
        if (op && previous !== null) {
          const result = compute(previous, op, parseFloat(current));
          current = String(result);
          previous = null;
          op = null;
          overwrite = true;
        }
        render();
        return;
      }
      if (o) { setOperator(o); render(); return; }
    });
  });

  render();

  window.addEventListener('keydown', (e) => {
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
      inputDigit(e.key); render(); return;
    }
    if (e.key === 'Enter' || e.key === '=') {
      document.querySelector('[data-action="equals"]').click(); return;
    }
    if (e.key === 'Backspace') {
      if (current.length > 1) current = current.slice(0,-1);
      else current = '0';
      render(); return;
    }
    if (['+','-','*','/'].includes(e.key)) {
      setOperator(e.key); render();
    }
  });
})();

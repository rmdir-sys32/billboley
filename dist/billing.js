(function (root) {
  'use strict';
  const products = [
    { id: 'rice', name: 'Chawal', english: 'Rice', unit: 'kg', price: 6000, aliases: ['chawal', 'chaval', 'rice', 'चावल'] },
    { id: 'sugar', name: 'Chini', english: 'Sugar', unit: 'kg', price: 4500, aliases: ['chini', 'cheeni', 'sugar', 'चीनी', 'शक्कर', 'shakkar'] },
    { id: 'atta', name: 'Atta', english: 'Wheat flour', unit: 'kg', price: 4200, aliases: ['atta', 'aata', 'flour', 'आटा'] },
    { id: 'dal', name: 'Masoor dal', english: 'Red lentils', unit: 'kg', price: 11000, aliases: ['masoor dal', 'masur dal', 'masoor', 'मसूर दाल', 'मसूर'] },
    { id: 'milk', name: 'Doodh · 500 ml', english: 'Milk packet', unit: 'packet', price: 2800, aliases: ['doodh', 'dudh', 'milk', 'दूध'] },
    { id: 'oil', name: 'Tel', english: 'Loose cooking oil', unit: 'L', price: 14000, aliases: ['tel', 'oil', 'तेल'] },
    { id: 'salt', name: 'Namak · 1 kg', english: 'Salt packet', unit: 'packet', price: 2000, aliases: ['namak', 'salt', 'नमक'] },
    { id: 'soap', name: 'Sabun', english: 'Soap bar', unit: 'piece', price: 3500, aliases: ['sabun', 'saboon', 'soap', 'साबुन'] },
    { id: 'tea', name: 'Chai patti', english: 'Loose tea', unit: 'kg', price: 40000, aliases: ['chai patti', 'tea', 'चाय पत्ती'] }
  ];
  const numbers = {ek:1,one:1,'एक':1,do:2,two:2,'दो':2,teen:3,three:3,'तीन':3,char:4,chaar:4,four:4,'चार':4,paanch:5,panch:5,five:5,'पांच':5,'पाँच':5,chhe:6,cheh:6,six:6,'छह':6,saat:7,seven:7,'सात':7,aath:8,eight:8,'आठ':8,nau:9,nine:9,'नौ':9,das:10,ten:10,'दस':10,aadha:.5,adha:.5,aadhi:.5,half:.5,'आधा':.5,'आधी':.5,paav:.25,pav:.25,quarter:.25,'पाव':.25,dedh:1.5,'डेढ़':1.5,dhai:2.5,'ढाई':2.5};
  const units = {kg:'kg',kilo:'kg',kilos:'kg',kilogram:'kg',kilograms:'kg','किलो':'kg','किलोग्राम':'kg',g:'g',gm:'g',gram:'g',grams:'g','ग्राम':'g',l:'L',litre:'L',liter:'L',litres:'L',liters:'L','लीटर':'L',ml:'ml','मिलीलीटर':'ml',packet:'packet',packets:'packet',pack:'packet',packs:'packet','पैकेट':'packet',piece:'piece',pieces:'piece',bar:'piece',bars:'piece','पीस':'piece'};
  function normalize(text) { return text.toLowerCase().replace(/[०-९]/g, c => '०१२३४५६७८९'.indexOf(c)).replace(/[।!?]/g,' ').replace(/\s+/g,' ').trim(); }
  function findProduct(chunk) {
    const found = products.filter(p => p.aliases.some(alias => (' '+chunk+' ').includes(' '+alias+' ')));
    if (found.length !== 1) throw Error(found.length ? 'Please separate items with a comma or “aur”.' : 'Item not recognized. Use a name from Products, or tap to add it.');
    const product = found[0];
    const alias = [...product.aliases].sort((a,b)=>b.length-a.length).find(a=>(' '+chunk+' ').includes(' '+a+' '));
    return {product, rest: (' '+chunk+' ').replace(' '+alias+' ',' ').trim()};
  }
  function quantityFor(rest, product) {
    const tokens = rest.split(' ').filter(Boolean); let amount = null, unit = null;
    const ignored = new Set(['ka','ki','ke','wala','wali','wale','please','add','jodo','jod','karo','kar','do','karna','कर','दो','का','की','के','जोड़ो','जोड़','करो','करना','make','set','to','it','badlo','बदल','बदलो']);
    for (const token of tokens) {
      let n = Object.hasOwn(numbers,token) ? numbers[token] : /^\d+(?:\.\d+)?$/.test(token) ? Number(token) : null;
      // shortcut: only one quantity and one unit per item; add compound spoken-number parsing after collecting real transcripts.
      if (n !== null) { if(amount !== null) throw Error('Use one quantity per item, such as “500 gram chini”.'); amount=n; }
      else if (Object.hasOwn(units,token)) { if(unit!==null) throw Error('Use one unit per item. Milk is sold as 500 ml packets.'); unit=units[token]; }
      else if (!ignored.has(token)) throw Error('“'+token+'” needs clarification. Use the exact product and one quantity from the demo catalogue.');
    }
    if(amount===null) throw Error('Please include a quantity, such as “ek kilo chawal”.');
    if(unit===null) unit=product.unit;
    if (product.unit==='kg' && unit==='g') amount/=1000;
    else if(product.unit==='L' && unit==='ml') amount/=1000;
    else if(product.id==='milk' && (unit==='L'||unit==='ml')) amount=(unit==='L'?amount*1000:amount)/500;
    else if(unit!==product.unit) throw Error(product.name+' uses '+product.unit+'. Please check the unit.');
    if(!Number.isFinite(amount)||amount<=0||amount>1000) throw Error('Quantity must be above zero and no more than 1,000 sale units.');
    if((product.unit==='piece'||product.unit==='packet')&&!Number.isInteger(amount)) throw Error(product.name+' requires a whole number of '+product.unit+'s.');
    if(Math.abs(amount*1000-Math.round(amount*1000))>0.00001) throw Error('Use quantities precise to 1 gram or 1 ml.');
    return Math.round(amount*1000);
  }
  function applyCommand(input, rows) {
    if(typeof input!=='string'||!input.trim()) throw Error('Say or type some items first.');
    if(input.length>2000) throw Error('Please add a shorter basket, up to 2,000 characters.');
    const chunks = normalize(input).split(/\s*(?:[,;\n]+|\baur\b|\band\b|और)\s*/u).filter(Boolean);
    const next = rows.map(r=>({...r}));
    for(const chunk of chunks) {
      const {product,rest}=findProduct(chunk);
      const remove=/\b(remove|delete|hata|hatao|nikal|nikalo)\b|हटा|हटाओ|निकाल/u.test(rest);
      const update=/\b(make|set|badlo)\b|\bkar\s+do\b|कर\s+दो|बदलो/u.test(rest);
      const index=next.findIndex(r=>r.id===product.id);
      if(remove) {
        const leftover=rest.replace(/\b(remove|delete|hata|hatao|nikal|nikalo|do|please)\b|हटाओ|हटा|निकालो|निकाल|दो/gu,' ').trim();
        if(leftover) throw Error('To remove the whole item, say “'+product.aliases[0]+' hata do”.');
        if(index<0) throw Error(product.name+' is not on this bill.');
        next.splice(index,1); continue;
      }
      const qty=quantityFor(update?rest.replace(/\bkar\s+do\b|कर\s+दो/gu,''):rest,product);
      if(update&&index<0) throw Error(product.name+' is not on this bill. Add it first.');
      if(index<0) next.push({id:product.id,qty,price:product.price});
      else {next[index].qty=update?qty:next[index].qty+qty; if(next[index].qty>1000000)throw Error('Quantity too large. Please check this item.');}
    }
    return next;
  }
  function lineTotal(row) {return Math.round(row.price*row.qty/1000);}
  function total(rows) {return rows.reduce((sum,row)=>sum+lineTotal(row),0);}
  const api={products,applyCommand,total,lineTotal,normalize};
  if(typeof module!=='undefined'&&module.exports) module.exports=api; else root.Billing=api;
})(typeof window!=='undefined'?window:globalThis);

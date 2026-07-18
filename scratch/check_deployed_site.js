const https = require('https');

https.get('https://workshop-procedure-gsa-trainer.netlify.app/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const hasXuanThi = data.includes('Xuân Thi');
    const hasThao = data.includes('Thảo');
    const hasChiThang = data.includes('Chí Thắng');
    const hasMembersTab = data.includes('mainTabMembers');
    
    console.log('--- Deployed Site Check ---');
    console.log('Has Xuân Thi:', hasXuanThi);
    console.log('Has Thảo:', hasThao);
    console.log('Has Chí Thắng:', hasChiThang);
    console.log('Has Members Tab:', hasMembersTab);
  });
}).on('error', (err) => {
  console.error('Error fetching site:', err);
});

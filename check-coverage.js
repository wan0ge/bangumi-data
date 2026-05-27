const fs = require('fs-extra');
const path = require('path');

const itemsDir = path.resolve('data/items');
const months = fs.readdirSync(itemsDir).filter(f => fs.statSync(path.join(itemsDir, f)).isDirectory());

let total = 0;
let videoSnCount = 0;
let seasonIdCount = 0;
const siteStats = {};

for (const year of months) {
  const yearDir = path.join(itemsDir, year);
  const files = fs.readdirSync(yearDir).filter(f => f.endsWith('.json'));
  for (const file of files) {
    const items = fs.readJsonSync(path.join(yearDir, file));
    for (const item of items) {
      if (!item.sites) continue;
      for (const site of item.sites) {
        total++;
        if (site.video_sn) videoSnCount++;
        if (site.season_id) seasonIdCount++;
        if (!siteStats[site.site]) siteStats[site.site] = { total: 0, video_sn: 0, season_id: 0 };
        siteStats[site.site].total++;
        if (site.video_sn) siteStats[site.site].video_sn++;
        if (site.season_id) siteStats[site.site].season_id++;
      }
    }
  }
}

console.log('\n===== 覆盖率统计 =====');
console.log('总站点条目: ' + total);
console.log('video_sn:  ' + videoSnCount + '/' + total + '  (' + (videoSnCount/total*100).toFixed(1) + '%)');
console.log('season_id: ' + seasonIdCount + '/' + total + '  (' + (seasonIdCount/total*100).toFixed(1) + '%)');
console.log('\n----- 分平台统计（仅显示有覆盖率的平台）-----');
for (const [site, stats] of Object.entries(siteStats)) {
  if (stats.video_sn === 0 && stats.season_id === 0) continue;
  console.log('\n[' + site + ']');
  console.log('  条目总数: ' + stats.total);
  console.log('  video_sn:  ' + stats.video_sn + '/' + stats.total + '  (' + (stats.video_sn/stats.total*100).toFixed(1) + '%)');
  console.log('  season_id: ' + stats.season_id + '/' + stats.total + '  (' + (stats.season_id/stats.total*100).toFixed(1) + '%)');
}

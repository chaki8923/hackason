//
// 以下のページで詳細を解説しています
// https://qiita.com/alclimb/items/31d4360c74a8f8935256
//

import * as d3 from 'd3';
import React, { useEffect } from 'react';
// GeoJsonファイルを読み込み
import geoJson from './japan.geo.json';
import sampleJson from './todouhuken.json';
import { FeatureCollection, Feature } from 'geojson';
interface PrefectureData {
  name: string;
  value: number;
}

function D3() {
  const width = 400; // 描画サイズ: 幅
  const height = 400; // 描画サイズ: 高さ
  const centerPos: [number, number] = [137.0, 38.2]; // 地図のセンター位置
  const scale = 1000; // 地図のスケール


  useEffect(() => {
    // 地図の投影設定
    const projection = d3
      .geoMercator()
      .center(centerPos)
      .translate([width / 2, height / 2])
      .scale(scale);

      
      
      // 地図をpathに投影(変換)
      const path: any = d3.geoPath().projection(projection);
      const prefCoords = projection([142.3538, 43.0621]);
      
    // 都道府県ごとのデータを取得するAPIのエンドポイントとする
    interface MyData {
      name: string;
      capital: string;
      population: number;
      area: number;
      cities: {
        name: string;
        population: number;
      }[];
    }[]
    // [ メモ ]
    // 動的にGeoJsonファイルを読み込む場合は以下のコードを使用
    // const geoJson = await d3.json(`/japan.geo.json`);
    //

    // 都道府県の領域データをpathで描画
    const apiResponse = sampleJson.prefectures

    const colorDomain: number[] = apiResponse.map(p => p.population);
    const colorScale = d3.scaleSequential(d3.interpolateBlues).domain([0, d3.max(colorDomain) as number]);

    // これないと地図二つでる
    const container = document.getElementById("map-container")!;
    container.innerHTML = ""


    const svg = d3
      .select(`#map-container`)
      .append(`svg`)
      .attr(`viewBox`, `0 -15 ${width} ${height}`)
      .attr(`width`, `100%`)
      .attr(`height`, `100%`);

      apiResponse.forEach(function(pref) {
        if (pref.flag) {
          const coords = geoJson.features.find(function(feature) {
            // console.log("name_js::" + feature.properties.name_ja);
            // console.log("name::" + pref.name);
            
            return feature.properties.name_ja === pref.name;
          })?.geometry?.coordinates;

          if (coords) {
            
            console.log("coords::" + coords![0]);
            const position = projection(coords);
            // const position = coords
            svg.append("text")
              .attr("x", position![0])
              .attr("y", position![1])
              .attr("text-anchor", "middle")
              .text("⭐️");
          }
        }
      })
    svg
      .selectAll(`path`)
      .data(geoJson.features)
      .enter()
      .append(`path`)
      .attr(`d`, path)
      .attr(`stroke`, `#666`)
      .attr(`stroke-width`, 0.25)
      .attr(`fill`, function (d) {
        const prefecture = apiResponse.find(function (p) {
          return p.name === d.properties.name_ja;
        });
        if (prefecture) {
          return colorScale(prefecture.population);
        } else {
          return "#ccc";
        }
      })
      /**
       * 都道府県領域の MouseOver イベントハンドラ
       */
      .on(`mouseover`, function (item: any) {
        // ラベル用のグループ
        const group = svg.append(`g`).attr(`id`, `label-group`);
        // 地図データから都道府県名を取得する
        const label = item.properties.name_ja;

        const prefecture = apiResponse.find(p => p.name === item.properties.name_ja);
        const population = prefecture ? prefecture.population : "データなし";
        // ツールチップのHTML要素を作成
        const tooltip = d3.select("body")
          .append("div")
          .attr("class", "tooltip")
          .style("position", "absolute")
          .style("z-index", "10")
          .style("visibility", "hidden")
          .html(`${item.properties.name_ja}<br>人口: ${population}`);

        // ツールチップを表示
        tooltip.style("visibility", "visible");

        // 矩形を追加: テキストの枠
        const rectElement = group
          .append(`rect`)
          .attr(`id`, `label-rect`)
          .attr(`stroke`, `#666`)
          .attr(`stroke-width`, 0.5)
          .attr(`fill`, `#fff`);

        // テキストを追加
        const textElement = group
          .append(`text`)
          .attr(`id`, `label-text`)
          .text(label);

        // テキストのサイズから矩形のサイズを調整
        const padding = { x: 5, y: 5 };
        const textSize = textElement.node()!.getBBox();
        rectElement
          .attr(`x`, textSize.x - padding.x)
          .attr(`y`, textSize.y - padding.y)
          .attr(`width`, textSize.width + padding.x * 2)
          .attr(`height`, textSize.height + padding.y * 2);

        // マウス位置の都道府県領域を赤色に変更
        // d3.select(this).attr(`fill`, `#CC4C39`);
        d3.select(this).attr(`stroke-width`, `1`);
      })

      /**
       * 都道府県領域の MouseOut イベントハンドラ
       */
      .on(`mouseout`, function (item: any) {
        // ラベルグループを削除
        svg.select('#label-group').remove();
        // ツールチップを非表示にする
        d3.select(".tooltip").remove();

        // マウス位置の都道府県領域を青色に戻す
        // d3.select(this).attr(`fill`, `#2566CC`);
        d3.select(this).attr(`stroke-width`, `0.25`);
      });
  })

  return (
    <div id="map-container">

    </div>
  );
}
export default D3;


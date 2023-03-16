import * as d3 from 'd3';

interface Datum extends d3.SimulationNodeDatum {
  name: string
}
type LinkDatum = d3.SimulationLinkDatum<Datum>

function render() {
  const svgWidth = 400;
  const svgHeight = 200;
  const svg = d3.select('body')
    .append('svg')
    .attr('viewBox', [svgWidth / -2, svgHeight / -2, svgWidth, svgHeight])
    .style('font', '12px sans-serif');

  const nodes: Datum[] = [
    { name: '1' },
    { name: '2' },
    { name: '3' },
    { name: '4' },
  ];
  const links: LinkDatum[] = [
    { source: '1', target: '3' },
    { source: '2', target: '3' },
  ];

  svg.append('defs')
    .append('marker')
    .html(`
    <marker
      id="arrow"
      viewBox="0 0 10 10"
      refX="12"
      refY="5"
      markerWidth="6"
      markerHeight="6"
      orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" />
    </marker>`);

  const nodeSvg = svg.append('g')
    .selectAll('circle')
    .data(nodes)
    .join('circle')
    .attr('r', 2);

  const linkSvg = svg.append('g')
    .attr('stroke', 'black')
    .attr('stroke-opacity', 0.5)
    .attr('stroke-width', 1)
    .attr('marker-end', 'url(#arrow)')
    .selectAll('line')
    .data(links)
    .join('line');

  const ticked = () => {
    const castToDatum = (data: string | number | Datum) => {
      if (data instanceof Object) {
        return data;
      }
      return null;
    };
    linkSvg
      .attr('x1', (d: d3.SimulationLinkDatum<Datum>) => castToDatum(d.source)?.x || 0)
      .attr('y1', (d: d3.SimulationLinkDatum<Datum>) => castToDatum(d.source)?.y || 0)
      .attr('x2', (d: d3.SimulationLinkDatum<Datum>) => castToDatum(d.target)?.x || 0)
      .attr('y2', (d: d3.SimulationLinkDatum<Datum>) => castToDatum(d.target)?.y || 0);

    nodeSvg
      .attr('cx', (d) => d.x || 0)
      .attr('cy', (d) => d.y || 0);
  };

  const simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink<Datum, LinkDatum>(links).id((d) => d.name))
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter())
    .on('tick', ticked);

  nodeSvg.call(
    d3.drag()
      .on('start', (event) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        // eslint-disable-next-line no-param-reassign
        event.subject.fx = event.subject.x;
        // eslint-disable-next-line no-param-reassign
        event.subject.fy = event.subject.y;
      })
      .on('drag', (event) => {
        // eslint-disable-next-line no-param-reassign
        event.subject.fx = event.x;
        // eslint-disable-next-line no-param-reassign
        event.subject.fy = event.y;
      })
      .on('end', (event) => {
        if (!event.active) simulation.alphaTarget(0);
        // eslint-disable-next-line no-param-reassign
        event.subject.fx = null;
        // eslint-disable-next-line no-param-reassign
        event.subject.fy = null;
        // eslint-disable-next-line no-unused-vars
      }) as (_: unknown) => void,
  );
}

export = render;

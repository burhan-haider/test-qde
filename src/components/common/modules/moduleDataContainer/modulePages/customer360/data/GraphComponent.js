import React, { useEffect, useState, useRef } from  'react';
import { useD3 } from '@application';
import * as d3 from 'd3';

const GraphComponent = (props) => {

    const [d3Config, setD3Config] = useState("")

    const parentRef = useRef();
    const d3Container = useRef();

    const data = props.data?props.data:null;

        var channelName = null;
	    var countTrans = "N.A.";
        var channelType = null;
	    // var customerId = document.getElementById("customerId").value;
	    var transAmount = null;
        var diameter = 800;
        var wid = 12000;
        var hei = wid-100;

        var margin = {
            top : 400,
            right : 200,
            bottom : 150,
            left : 600
        }
        var width = wid - margin.right - margin.left;
        var height = hei - margin.top - margin.bottom;

        var i = 0
        var duration = 500
        var root;

        var custName;

        var r = 960 / 2;

        

        // var diagonal = d3.linkHorizontal()
        //     .y(function(d) {
        //         return d.y;
        //     })
        //     .x(function(d){
        //         return d.x / 180 * Math.PI;
        //     })

        useEffect(()=>{

            console.log("parentRef:-", parentRef.current.width)

            var tree = d3.tree().size([height, width]).separation((a, b)=>{
                return (a.parent == b.parent ? 1 : 2) / a.depth;
            })
    
            var diagonal = d3.linkRadial().angle((d) => { 
                return d.x / 180 * Math.PI; 
            });

            var svg = d3.select(d3Container.current).append("svg:svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .append("svg:g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            //collapse nodes
            const collapse = (d) => {
                if (d.children) {
                    d._children = d.children;
                    d._children.forEach(collapse);
                    d.children = null;
                }
            }
                
            //expand nodes
            const expand = (d) => {   
                var children = (d.children)?d.children:d._children;
                if (d._children) {        
                    d.children = d._children;
                    d._children = null;       
                }
                if(children)
                    children.forEach(expand);
            }

            const update = (source) => {
                const treeRoot = d3.hierarchy(source)
                tree(treeRoot);

                // Compute the new tree layout.
                const nodes = treeRoot.descendants();
                const links = treeRoot.links();

                //Normalize for fixed-depth.
                nodes.forEach((d)=>{
                    d.y = d.depth * 80;
                });

                // Update the nodes…
                var node = svg.selectAll("g.node")
                    .data(nodes, (d)=>{
                        return d.id || (d.id = ++i);
                    })

                // Enter any new nodes at the parent's previous position.
                var nodeEnter = node.enter()
                    .append("g")
                    .attr("class", "node")
                    .on("click", (d)=>{
                        if(d.depth<=1 || d.depth==2){
                            if (d.children) {
                                d._children = d.children;
                                d.children = null;
                            }
                            else{
                                d.children = d._children;
                                d._children = null;
                            }
                            update(d);
                        }
                        // else if(d.depth==2){
                        //     if (d.children) {
                        //         d._children = d.children;
                        //         d.children = null;
                        //     }
                        //     else {
                        //         d.children = d._children;
                        //         d._children = null;
                        //     }
                        //     update(d);
                        // }
                        else if(d.depth==3){
                            if (d.children) {
                                d._children = d.children;
                                d.children = null;
                            }
                            else {
                                d.children = d._children;
                                d._children = null;
                                channelType = d.name;
                            }
                            update(d);
                        }
                        else if(d.depth>=3){
                            var moduleValueClicked = d.name;
                            var moduleCode = "transactionDetailsMaster";
                            var moduleHeader = "Transaction Details";
                            var moduleValue = moduleValueClicked;
                            var detailPage = "InvestigationTools/TransactionDetails/TransactionDetails";
                            // if(moduleValue != undefined){
                            //     openModalInTab($(this), moduleHeader, moduleValue, moduleCode, detailPage);

                            // }
                        }
                    })

                nodeEnter.append("circle")
                    .attr("r", 2.5)
                    .style("fill", d => d._children ? "lightsteelblue" : "#fff");

                nodeEnter.append("rect")
                    .attr("width", 2)
                    .attr("height", 10)
                    .attr("x", 5)
                    .attr("y", -5)
                    .attr("transform", d=>d.id==1?"rotate(180)":"rotate(0)")
                    .style("fill", "white");

                nodeEnter.append("g").append("text")
                    .style("text-decoration", d=>d.depth>3?"underline":"none")
                    .style("fill", d=>d.depth>3?"blue":"black")
                    .style("fill-opacity", 1)
                    .attr("dx", d=>d.x<180?6:-6)
                    .attr("class", "keyText")
                    .attr("dy", 0.35)
                    .on("mouseover", (d)=>{}) /* Need to Comeback For Flare Data Dialog Box */  
                    .attr("text-anchor", d=>d.x<180?"end":"start")
                    .attr("transform", d=>d.id==1?"rotate(234)":d.x<180?null:"rotate(180)")
                    .text(d=>d.depth==0?custName+" - "+d.name+" ":d.name);

                nodeEnter.selectAll('rect')
                    // .attr("width", d=>d.parentNode?d.parentNode.getBBox().width:0)
                    .attr("width", d=>d.parentNode?120:0)

                // Transition nodes to their new position.
                var nodeUpdate = node.transition()
                    .duration(duration)
                    .attr("transform", d=>"rotate(" + (d.x-90) + ")translate(" + d.y + ")");

                nodeUpdate.select("circle")
                    .attr("r", 2.5)
                    .style("fill", d=>{
                        switch(d.depth){
                            case 0: return "rgb(0,0,4)"
                            case 1: return "rgb(81,19,124)"
                            case 2: return "rgb(182, 55, 122)"
                            case 3: return "rgb(251, 135, 98)"
                            case 4: return "rgb(0, 0, 255)"
                            case 5: return "rgb(251, 135, 98)"
                            default: return "rgb(252, 253, 191)"
                        }
                    });
                
                nodeUpdate.select("text")
                    .text(d=>{
                        if(d.name === "Customer Name"){
                            custName = d.value;
                        }
                        return d.depth==0?custName+" - "+d.name+" ":d.name;
                    })
                    .style("fill-opacity", 1);

                // Transition exiting nodes to the parent's new position.
                var nodeExit = node.exit().transition().duration(duration).remove()

                nodeExit.select("circle").attr("r", 2.5);

                nodeExit.select("text").style("fill-opacity", 1);

                // Update the links…
                var link = svg.selectAll("path.link").data(links, d=>d.target.id);

                // Enter any new links at the parent's previous position.
                link.enter().insert("path", "g")
                    .attr("class", "link")
                    .attr("d", d=>{
                        var o = {
                            x: source.x0,
                            y: source.y0
                        };
                        return diagonal({
                            source: o,
                            target: o
                        });
                    })
                    .attr("stroke", d=>{
                        switch(d.target.depth){
                            case 1: return "rgb(0,0,4)"
                            case 2: return "rgb(81,19,124)"
                            case 3: return "rgb(182, 55, 122)"
                            case 4: return "rgb(251, 135, 98)"
                            case 5: return "rgb(251, 135, 98)"
                            case 6: return "rgb(204, 204, 0)"
                            default: return "rgb(252, 253, 191)"
                        }
                    });

                // Transition links to their new position.
                link.transition().duration(duration).attr("d", diagonal);

                // Transition exiting nodes to the parent's new position.
                link.exit().transition().duration(duration).attr("d", d=>{
                    var o = {
                        x: source.x,
                        y: source.y
                    };
                    return diagonal({
                        source: o,
                        target: o
                    });
                })
                .remove();

                // Stash the old positions for transition.
                nodes.forEach(d=>{
                    d.x0 = d.x;
                    d.y0 = d.y;
                });
            }

            if(data!=null){
                root = data;
                root.x0 = height / 2;
                root.y0 = 0;
                custName = root.children[0].children[0].children[1].value
    
                root.children[0].children.forEach(collapse);
                root.children[1].children.forEach(collapse);
            
                update(root);
            }

            

            // Toggle children on click.
            const click = (d) => {
                if (d.children) {
                    //alert("inside click if")
                    d._children = d.children;
                    d.children = null;
                } 
                else{
                    //alert("inside click else second")
                    d.children = d._children;
                    d._children = null;
                }

                update(d);
            }

            

            function expandAll(){
                expand(root); 
                update(root);
            }
        
            function collapseAll(){
                root.children.forEach(collapse);
                collapse(root);
                update(root);
            }
        }, [data])
        
        

    return(
        <div ref={parentRef} >
            <div id="chart" ref={d3Container} ></div>
        </div>
    )

}

export default GraphComponent;
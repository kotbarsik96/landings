export default {
    setContentClassNames(componentType = "spoiler") {
        if (componentType === "spoiler") {
            const contentContainers = this.$refs.contentContainer;
            contentContainers.forEach((containerNode, index) => {
                containerNode.className += ` ${this.titles[index].contentContainerClass}` || "";
                setContentChildrenClasses.call(this, containerNode);
            });
        }
        if(componentType === "tab") {
            const containerNode = this.$refs.contentContainer;
            const containerNodeClasses = this.titles[this.activeTitle].contentContainerClass;
            containerNode.className = containerNodeClasses ? `tab__content ${containerNodeClasses}` : "tab__content";
            setContentChildrenClasses.call(this, containerNode);
        }

        function setContentChildrenClasses(containerNode) {
            const childNodes = Array.from(containerNode.childNodes).filter(child => child.nodeType !== 3);
            childNodes.forEach(child => {
                if (child.className) return;
                switch (child.tagName) {
                    case "H5":
                    case "H4":
                    case "H3":
                        child.className = this.titleClassName;
                        break;
                    case "DIV":
                    case "P":
                        child.className = this.paragraphClassName;
                        break;
                }
            });
        }
    }
}
import MarkdownIt from "markdown-it";
import mdContainerPlugin from "markdown-it-container";
import linkAttributesPlugin from "markdown-it-link-attributes";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

md.use(linkAttributesPlugin, {
  matcher(href: string) {
    return href.startsWith("https:") || href.startsWith("http:");
  },
  attrs: {
    target: "_blank",
    rel: "noopener",
  },
});

md.renderer.rules.image = (tokens, idx, options, env, slf) => {
  const token = tokens[idx];
  if (!token.attrs) token.attrs = [];

  if (token.children) {
    token.attrs[token.attrIndex("alt")][1] = slf.renderInlineAsText(
      token.children,
      options,
      env,
    );
  }

  const caption = token.attrs?.[token.attrIndex("title")]?.[1];
  const imgRenderer = `<span class="as-figure">${slf.renderToken(
    tokens,
    idx,
    options,
  )} <span class="as-figure__zoom"><span></span></span></span>`;
  const captionRenderer = caption
    ? `<span class="as-figcaption">${caption}</span>`
    : "";

  return `${imgRenderer}${captionRenderer}`;
};

/**
 * layout composition and nesting
 * to spice up the layout a little and to give more freedom
 * we currently have avail some predefined containers
 * each container will result in a div with the same className
 * the containers then can be easily styled/overwritten in markdown.css
 *
 * the only special case is 'slide' which is used to split the content into multiple slides
 *
 * http://spec.commonmark.org/0.25/#fenced-code-blocks
 * Use the same principle as in fenced block for nested things - add more : for outer block start/end.
 */

const defaultCustomContainers = ["home", "background", "slide", "app-logo"];

export interface FetchMarkdownRes {
  contents?: Array<string> | null;
}

export interface MarkdownConfig {
  containers: Array<string>;
}

export async function getParsedFileContentById(
  contentUrl: string,
): Promise<FetchMarkdownRes> {
  let configContainers = [] as MarkdownConfig["containers"];

  try {
    const markdownConfig = await fetch("/assets/markdown.json");

    if (markdownConfig.ok) {
      const markdownConfigData = await markdownConfig.json();
      configContainers = markdownConfigData.containers || [];
    } else {
      console.debug("Markdown:::Missing custom Markdown config");
    }
  } catch (error) {
    console.debug("Markdown:::Missing custom Markdown config", error);
  }

  const customContainers = [...defaultCustomContainers, ...configContainers];

  console.debug("Markdown:::custom containers", customContainers);

  customContainers.forEach((ctn) => md.use(mdContainerPlugin, ctn));

  const response = await fetch(contentUrl);
  const data = await response.text();

  let contents = null;

  if (!response.ok) {
    return { contents };
  }

  // split content into slides

  const html = md.render(data);
  const tmpDiv = document.createElement("div");
  tmpDiv.innerHTML = html;
  const slides = tmpDiv.querySelectorAll(".slide");

  if (!slides || !slides.length) return { contents: [html] };

  contents = Array.from(slides).map((slide) => slide.outerHTML);

  return { contents };
}

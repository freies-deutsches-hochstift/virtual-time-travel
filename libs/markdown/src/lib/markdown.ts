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

/**
 * layout composition and nesting
 * to spyce up the layout a little and to give more freedome
 * we currently have avail some predifined containers
 * each container will result in a div with the same className
 * the containers then can be easily styled/overwritten in theme.css
 *
 * the only special case is 'slide' which is used to split the content into multiple slides
 *
 * http://spec.commonmark.org/0.25/#fenced-code-blocks
 * Use the same principle as in fenced block for nested things - add more : for outer block start/end.
 */

md.use(mdContainerPlugin, "splash");
md.use(mdContainerPlugin, "card");
md.use(mdContainerPlugin, "background");
md.use(mdContainerPlugin, "slide");

export interface FetchMarkdownRes {
  contents?: Array<string> | null;
}

export async function getParsedFileContentById(
  contentUrl: string,
): Promise<FetchMarkdownRes> {
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

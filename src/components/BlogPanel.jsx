import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiCalendar, FiTag, FiX } from "react-icons/fi";

const rawFiles = import.meta.glob("../blogs/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

function parseFrontmatter(raw) {
  const match = raw.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  raw = raw.replace(/\r\n/g, '\n').trim();
  if (!match) return { meta: { title: "Untitled", date: "", tags: [] }, body: raw };
  const meta = {};
  match[1].split("\n").forEach((line) => {
    const [key, ...rest] = line.split(":");
    const val = rest.join(":").trim();
    if (key?.trim() === "tags") {
      meta.tags = val.replace(/[\[\]]/g, "").split(",").map((t) => t.trim()).filter(Boolean);
    } else if (key?.trim()) {
      meta[key.trim()] = val;
    }
  });
  return { meta, body: match[2].trim() };
}

function renderMarkdown(md) {
  return md
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[hbuloaip])(.+)$/gm, (m) => (m.trim() ? `<p>${m}</p>` : ""))
    .replace(/<p><\/p>/g, "");
}

const BlogPanel = ({ isOpen, onClose }) => {
  const [posts, setPosts] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const parsed = Object.entries(rawFiles).map(([path, raw]) => {
      const slug = path.replace("./blogs/", "").replace(".md", "");
      const { meta, body } = parseFrontmatter(raw);
      return { slug, meta, body };
    });
    parsed.sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date));
    setPosts(parsed);
  }, []);

  useEffect(() => {
    if (!isOpen) setTimeout(() => setSelected(null), 400);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="blog-panel"
          className="absolute top-0 right-0 h-full z-40 flex flex-col"
          style={{
            width: "100%",
            backgroundColor: "#0d0d0d",
            borderLeft: "1px solid rgba(255,255,255,0.07)",
          }}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 280, damping: 30 }}
        >
          <div className="flex items-center justify-between px-6 pt-8 pb-5 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-white transition flex items-center gap-2 text-sm"
              >
                <FiArrowLeft size={15} />
                <span>Back</span>
              </button>
            </div>
            <span className="text-yellow-400 font-semibold text-sm tracking-widest uppercase">
              Blogs
            </span>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-hide">
            <div className="space-y-3">
              {posts.length === 0 ? (
                <p className="text-gray-600 text-sm text-center py-8">
                  No posts yet — add <code className="text-gray-500">.md</code> files to{" "}
                  <code className="text-gray-500">src/blogs/</code>
                </p>
              ) : (
                posts.map((post) => (
                  <motion.div
                    key={post.slug}
                    onClick={() => setSelected(selected?.slug === post.slug ? null : post)}
                    className={`rounded-2xl p-4 cursor-pointer transition border ${
                      selected?.slug === post.slug
                        ? "border-yellow-400/30 bg-yellow-400/5"
                        : "border-neutral-800 bg-neutral-900 hover:border-neutral-600"
                    }`}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`font-semibold text-sm leading-snug transition ${
                            selected?.slug === post.slug ? "text-yellow-400" : "text-white"
                          }`}
                        >
                          {post.meta.title}
                        </h3>

                        {post.meta.excerpt && (
                          <p className="text-gray-500 text-xs mt-1 line-clamp-2 leading-relaxed">
                            {post.meta.excerpt}
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          {post.meta.date && (
                            <span className="flex items-center gap-1 text-gray-600 text-xs">
                              <FiCalendar size={9} />
                              {post.meta.date}
                            </span>
                          )}
                          {post.meta.tags?.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs text-yellow-400/60 bg-yellow-400/5 border border-yellow-400/10 rounded-full px-2 py-0.5 flex items-center gap-1"
                            >
                              <FiTag size={8} />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <motion.span
                        animate={{ rotate: selected?.slug === post.slug ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-gray-600 mt-0.5 flex-shrink-0 text-sm"
                      >
                        →
                      </motion.span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
            <AnimatePresence>
              {selected && (
                <motion.div
                  key={selected.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="border-t border-neutral-800 pt-6"
                >
                  {/* Post header */}
                  <h2 className="text-white font-semibold text-xl leading-snug mb-3">
                    {selected.meta.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    {selected.meta.date && (
                      <span className="flex items-center gap-1 text-gray-500 text-xs">
                        <FiCalendar size={10} />
                        {selected.meta.date}
                      </span>
                    )}
                    {selected.meta.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 text-xs text-yellow-400/60 bg-yellow-400/5 border border-yellow-400/10 rounded-full px-2 py-0.5"
                      >
                        <FiTag size={9} />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div
                    className="prose-blog text-gray-300 text-sm leading-7"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(selected.body) }}
                  />

                  <style>{`
                    .prose-blog h1 { color: #fff; font-size: 1.3rem; font-weight: 600; margin: 1.4rem 0 0.4rem; }
                    .prose-blog h2 { color: #e5e5e5; font-size: 1.1rem; font-weight: 600; margin: 1.1rem 0 0.3rem; }
                    .prose-blog h3 { color: #d4d4d4; font-weight: 600; margin: 0.9rem 0 0.2rem; }
                    .prose-blog strong { color: #fff; }
                    .prose-blog em { color: #a3a3a3; font-style: italic; }
                    .prose-blog code { background: #1c1c1c; border: 1px solid #2a2a2a; padding: 1px 5px; border-radius: 4px; font-size: 0.78rem; color: #facc15; }
                    .prose-blog blockquote { border-left: 2px solid #facc15; padding-left: 0.9rem; color: #6b7280; font-style: italic; margin: 0.8rem 0; }
                    .prose-blog ul { list-style: disc; padding-left: 1.3rem; margin: 0.4rem 0; }
                    .prose-blog li { margin: 0.15rem 0; }
                    .prose-blog a { color: #facc15; text-decoration: underline; text-underline-offset: 3px; }
                    .prose-blog p { margin: 0.6rem 0; }
                    .scrollbar-hide::-webkit-scrollbar { display: none; }
                    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                  `}</style>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BlogPanel;
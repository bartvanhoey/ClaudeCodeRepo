// preview page for newly created UI components

import { Skeleton } from "@/components/Skeleton";
import Avatar from "@/components/Avatar";
import { HeistCard } from "@/components/HeistCard";
import styles from "@/components/HeistCard/HeistCard.module.css";
import { previewHeists } from "@/lib/data/preview-heists";

export default function PreviewPage() {
  return (
    <div className="page-content">
      <h2>Preview</h2>

      <div className="skeleton-preview">
        <h3>Skeleton Component</h3>

        <div className="skeleton-card">
          <div className="skeleton-header">
            <Skeleton variant="circular" width="120px" height="120px" />
            <div className="skeleton-text">
              <Skeleton width="350px" height="32px" />
              <Skeleton width="280px" height="24px" />
            </div>
          </div>

          <Skeleton width="100%" height="60px" />
          <Skeleton width="100%" height="60px" />
          <Skeleton width="60%" height="40px" />
        </div>
      </div>

      <div className={styles.previewSection}>
        <h3>HeistCard Component</h3>
        <div className={styles.previewGrid}>
          {previewHeists.map((heist) => (
            <HeistCard key={heist.id} heist={heist} />
          ))}
        </div>
      </div>

      <div className="avatar-preview">
        <h3>Avatar Component</h3>

        <div className="avatar-examples">
          <div className="avatar-group">
            <Avatar name="John" />
            <span>Single word (John)</span>
          </div>

          <div className="avatar-group">
            <Avatar name="JohnDoe" />
            <span>PascalCase (JohnDoe)</span>
          </div>

          <div className="avatar-group">
            <Avatar name="AlexSmith" />
            <span>PascalCase (AlexSmith)</span>
          </div>

          <div className="avatar-group">
            <Avatar name="sarah" />
            <span>Lowercase (sarah)</span>
          </div>

          <div className="avatar-group">
            <Avatar name="Bart Van Hoey"/>
            <span>(Bart Van Hoey)</span>
          </div>

          <div className="avatar-group">
            <Avatar name="Van Hoey Bart"/>
            <span>(Van Hoey Bart)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

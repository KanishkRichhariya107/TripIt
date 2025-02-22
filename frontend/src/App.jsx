// import Image from "next/image"
// import Link from "next/link"
import styles from "./index.module.css"
import { EyeIcon } from "lucide-react"

function App() {
	return (
		<div className={styles.container}>
			<div className={styles.leftSection}>
				<div className={styles.logoContainer}>
					{/* <Link href="/" className={styles.backLink}> <span>Back to website</span> </Link> */}
				</div>
				<div className={styles.heroContent}>
					<h2>
						Capturing Moments,
						<br />
						Creating Memories
					</h2>
					<div className={styles.dots}>
						<span></span>
						<span></span>
						<span className={styles.active}></span>
					</div>
				</div>
			</div>

			<div className={styles.rightSection}>
				<div className={styles.formContainer}>
					<h1>Create an account</h1>
					<p className={styles.loginText}>
						Already have an account? 
						{/* <Link href="/login">Log in</Link> */}
					</p>

					<form className={styles.form}>
						<div className={styles.nameFields}>
						<input type="text" placeholder="First Name" className={styles.input} />
						<input type="text" placeholder="Last Name" className={styles.input} />
						</div>

						<input type="email" placeholder="Email" className={styles.input} />

						<div className={styles.passwordContainer}>
						<input type="password" placeholder="Enter your password" className={styles.input} />
						<button type="button" className={styles.eyeButton}>
							<EyeIcon className={styles.eyeIcon} />
						</button>
						</div>

						<label className={styles.checkbox}>
						<input type="checkbox" />
						<span>
							I agree to the 
							{/* <Link href="/terms">Terms & Conditions</Link> */}
						</span>
						</label>

						<button type="submit" className={styles.submitButton}>Create account</button>

						<div className={styles.divider}>
							<span>Or register with</span>
						</div>

						<div className={styles.socialButtons}>
							<button type="button" className={styles.googleButton}>
								{/* <Image src="/google.svg" alt="Google" width={20} height={20} /> */}
								Google
							</button>
							<button type="button" className={styles.appleButton}>
								{/* <Image src="/apple.svg" alt="Apple" width={20} height={20} /> */}
								Apple
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default App

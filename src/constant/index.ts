import { Types } from 'mongoose';
import { IS_PRODUCTION } from '../config';

export function CONTEST_CONFIRMATION_EMAIL(
    receiver: string,
    teamName: string,
    confirmationCode: string,
) {
    return `
    <div dir="ltr">
	<div
		style="
			background-color: #f6f7f9;
			margin: 0;
			padding: 0;
			font-family: 'Open Sans', Arial, sans-serif !important;
			font-weight: 400;
			color: #202124;
		">
		<div></div>
		<table cellpadding="15" cellspacing="0" border="0" width="100%">
			<tbody>
				<tr>
					<td style="background-color: #f6f7f9" align="center" width="100%">
						<table
							style="
								border-bottom-left-radius: 4px;
								border-bottom-right-radius: 4px;
								overflow: hidden;
								min-width: 290px;
								max-width: 600px;
							"
							cellspacing="0"
							cellpadding="0"
							border="0">
							<tbody>
								<tr>
									<td>
										<table
											cellspacing="0"
											cellpadding="0"
											border="0"
											width="100%">
											<tbody>
												<tr>
													<td
														style="
															padding: 0 0 15px;
															font-family: 'Open Sans', Arial, sans-serif !important;
														"
														valign="middle">
														<a
															style="
																font-size: 12px;
																color: #6f6f6f !important;
																padding: 1px 0;
																text-decoration: none !important;
															"
															href="https://streaklinks.com/BT8hHi6i4sz87Zu_jgWlHBim/https%3A%2F%2Fu16161593.ct.sendgrid.net%2Fls%2Fclick%3Fupn%3D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0LwznXXv5-2BoPgUHFt4ZMWenhtzqm7TjwMiA-2FFAAcTgMmUzqjVEhGztoc3RXmIWr31f9U-3DI0CU_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utc0IXBPSuXDsulPt-2BMuYAqYyOAd83zZixxdWawNN-2BT-2BiEAS7-2Bs49aOD3vNf7i12oczTvTKAg7vnxumi6yz7-2BrLhBQeoo95o72ChUsisLrcxpHCbTdj3-2Fpf0KoNR-2B9tXM6uj3lrwEddbE5MTql81MA0wQ-3D-3D"
															target="_blank"
															data-saferedirecturl="https://www.google.com/url?q=https://streaklinks.com/BT8hHi6i4sz87Zu_jgWlHBim/https%253A%252F%252Fu16161593.ct.sendgrid.net%252Fls%252Fclick%253Fupn%253D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0LwznXXv5-2BoPgUHFt4ZMWenhtzqm7TjwMiA-2FFAAcTgMmUzqjVEhGztoc3RXmIWr31f9U-3DI0CU_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utc0IXBPSuXDsulPt-2BMuYAqYyOAd83zZixxdWawNN-2BT-2BiEAS7-2Bs49aOD3vNf7i12oczTvTKAg7vnxumi6yz7-2BrLhBQeoo95o72ChUsisLrcxpHCbTdj3-2Fpf0KoNR-2B9tXM6uj3lrwEddbE5MTql81MA0wQ-3D-3D&amp;source=gmail&amp;ust=1684900982510000&amp;usg=AOvVaw2hcgQx-yyLguam3pt8qVxw">
															Google Developer Student Clubs - VNU HCM -
															University of Technology
														</a>
													</td>

													<td
														style="
															padding: 0 0 15px;
															font-family: 'Open Sans', Arial, sans-serif !important;
														"
														valign="middle"
														align="right">
														<br />
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>

								<tr>
									<td
										style="
											width: 600px;
											height: 136px;
											vertical-align: middle;
											border-bottom: 0px solid #f6f7f9;
											background-image: url(https://ci3.googleusercontent.com/proxy/jTbSl0_Srn4p-vihHLXnamvPIRqeZxUV8BUKAc3K9e9SGOUfkrvcSD4lXc-hrT8Xy6TJTpGAoO1_1YQhcYJhuyEUTFyhmZKHILgw709SiBMN2jTydWgf-PLxJc7UJrg8BTjB7aVfi1k1LjsoJov1dIrrxeNjzDGWSWctWk0mu2U2Ob7UM1QWU8BrNTkvaA8PdcQqyhXjlHU-J7n3k5vcCTHI6QZno8Eei93sXQGLfNiw_9nWGxWmgA=s0-d-e1-ft#https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,h_135,q_auto:eco,w_600/v1/gcs/platform-data-dsc/contentbuilder/email_header.png);
											background-color: #fff;
											border-top-right-radius: 4px;
											border-top-left-radius: 4px;
											background-size: cover;
										">
										<table
											style="width: 100%"
											width="100%"
											cellspacing="20"
											cellpadding="0"
											border="0">
											<tbody>
												<tr>
													<td
														style="vertical-align: middle; text-align: center">
														<div style="display: inline-block">
															<a
																style="text-align: center; display: block"
																href="https://streaklinks.com/BT8hHi6PT1YYETjglwM_Hm9E/https%3A%2F%2Fu16161593.ct.sendgrid.net%2Fls%2Fclick%3Fupn%3D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0LwznXXv5-2BoPgUHFt4ZMWenhtzqm7TjwMiA-2FFAAcTgMmUzqjVEhGztoc3RXmIWr31f9U-3D1WWW_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utcOdQF6JS3ei-2Fi-2B544Dvf86oqppqJ8ierQQhGgjkxucq7fumdIZnstg-2BFUndpO-2FfxP4Ly3TP4GzCOy9ht90I8WESMt6kPH7KOOCcKJJqWM79bCah4CxTulb6AN7wK5cJ2S-2FdFuFhMq1xCBL1vObinRiQ-3D-3D"
																target="_blank"
																data-saferedirecturl="https://www.google.com/url?q=https://streaklinks.com/BT8hHi6PT1YYETjglwM_Hm9E/https%253A%252F%252Fu16161593.ct.sendgrid.net%252Fls%252Fclick%253Fupn%253D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0LwznXXv5-2BoPgUHFt4ZMWenhtzqm7TjwMiA-2FFAAcTgMmUzqjVEhGztoc3RXmIWr31f9U-3D1WWW_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utcOdQF6JS3ei-2Fi-2B544Dvf86oqppqJ8ierQQhGgjkxucq7fumdIZnstg-2BFUndpO-2FfxP4Ly3TP4GzCOy9ht90I8WESMt6kPH7KOOCcKJJqWM79bCah4CxTulb6AN7wK5cJ2S-2FdFuFhMq1xCBL1vObinRiQ-3D-3D&amp;source=gmail&amp;ust=1684900982510000&amp;usg=AOvVaw3gBg_MMpNAgWKpAVsRMA0Y">
																<img
																	height="50"
																	border="0"
																	alt="Google Developer Student Clubs"
																	src="https://ci3.googleusercontent.com/proxy/wEsj66QGvdQacrMw4Qm3A1r-Gbyd3Uz7XY2HRkhxyXCxKpzCzuqi2KlBu70FVmRXCvpd7HqgnKJFFW2ga4xiGnLgF1jjWDvQfTAgMBbC_onFujTrhFAl99zrDBLsS6moSRMG2EAHgFGRL2dLMbG-0GkgcVd3pOEeeTJzZzhI6CuspG6FeRi177hNC7sRe2INLGkoVoVMrgzZhPiZs4HnGot13yae4p1VnyKpydIqCwul8OV7wDdlCBT8EQ9K6HTlNVMM49A=s0-d-e1-ft#https://res.cloudinary.com/startup-grind/image/upload/c_fit,dpr_2.0,f_auto,g_center,h_100,q_auto:good,w_500/v1/gcs/platform-data-dsc/contentbuilder/logo_dark_stacked_ziDh4mP.png" />
															</a>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>

								<tr>
									<td style="padding-top: 1px">
										<table
											cellspacing="0"
											cellpadding="0"
											border="0"
											width="100%">
											<tbody>
												<tr>
													<td
														style="
															background-color: #fff;
															padding: 25px 35px;
															text-align: left;
															font-family: 'Open Sans', Arial, sans-serif !important;
															font-size: 14px;
															line-height: 20px;
														"
														align="center"
														valign="top">
														<span
															id="m_4733994766360779959m_7286841442065195665m_-7246610426249120709gmail-docs-internal-guid-1795923a-7fff-3ee5-47f8-07a4555c096e"
															><p
																dir="ltr"
																style="
																	line-height: 1.656;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																	padding: 0pt 0pt 10pt;
																">
																<span
																	style="
																		font-variant-numeric: normal;
																		font-variant-east-asian: normal;
																		font-variant-alternates: normal;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																	"
																	>Xin chào </span
																><span
																	style="
																		font-variant-numeric: normal;
																		font-variant-east-asian: normal;
																		font-variant-alternates: normal;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																	"
																	>${receiver}</span
																><span
																	style="
																		font-variant-numeric: normal;
																		font-variant-east-asian: normal;
																		font-variant-alternates: normal;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																	"
																	>,</span
																><br />
															</p>
															<p
																dir="ltr"
																style="
																	line-height: 1.872;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																	padding: 0pt 0pt 10pt;
																">
																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>Chúc mừng đội </span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>${teamName}</span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	đã đăng ký thành công và trở thành một phần
																	của cuộc thi GDSC Idea Contest: THiNK
																	2023.&nbsp;</span
																>
															</p>
															<p
																dir="ltr"
																style="
																	line-height: 1.872;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																	padding: 0pt 0pt 10pt;
																">
																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>Thông tin của các đội thi sẽ được cập nhật ở
																	website cuộc thi </span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	><a href="https://${IS_PRODUCTION ? '' : 'dev.'}gdsc.app/contestant">tại đây</a>. </span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>Để hoàn tất việc đăng ký, vui lòng xác nhận thông tin qua nút bấm bên
																	dưới.</span
																>
                                                                <div>
																	<a style="display:block;padding:0.75rem 1.25rem;border-radius:0.5rem;color:#fff;text-transform:uppercase;font-size:1rem;text-decoration:none;background-color:#e86357e7;margin:0 auto;text-align:center;width:fit-content;font-family:Arial,sans-serif" href="https://${
                                                                        IS_PRODUCTION
                                                                            ? ''
                                                                            : 'dev.'
                                                                    }gdsc.app/confirmation?code=${confirmationCode}" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://forms.gle/Ag3ehG4qdW1vWZKJA&amp;source=gmail&amp;ust=1684908126546000&amp;usg=AOvVaw1alecL8PA9aOvd-bNHMvHQ"><b>Xác nhận đăng ký</b></a>
																</div>
															</p>
															<p
																dir="ltr"
																style="
																	line-height: 1.872;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																">
																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>Bên cạnh đó cũng có những mốc thời gian và
																	địa điểm mà các bạn phải lưu ý để tránh bỏ lỡ
																	nhé:</span
																>
															</p>
															<ul
																style="
																	margin-top: 0px;
																	margin-bottom: 0px;
																	padding-inline-start: 48px;
																">
																<li
																	dir="ltr"
																	style="
																		list-style-type: disc;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	<p
																		dir="ltr"
																		style="
																			line-height: 1.872;
																			background-color: rgb(255, 255, 255);
																			margin-top: 0pt;
																			margin-bottom: 0pt;
																		"
																		role="presentation">
																		<span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>Ngày 11/06: </span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>GIC Opening day</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			">
																		</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>(Online 09:00 - 11:25)</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>. Nội dung, giải thưởng cũng như mục tiêu của cuộc thi sẽ được phổ biến cho các thí sinh.
                                                                            Ngoài ra, sự kiện còn đem đến cho mọi người chuyên mục “Fireside chat”, một hoạt động trò chuyện,
                                                                            đặt câu hỏi và lắng nghe những chia sẻ từ diễn giả về việc thiết kế, phát triển các giải pháp thiết thực.</span
																		>
																	</p>
																</li>
																<li
																	dir="ltr"
																	style="
																		list-style-type: disc;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	<p
																		dir="ltr"
																		style="
																			line-height: 1.872;
																			background-color: rgb(255, 255, 255);
																			margin-top: 0pt;
																			margin-bottom: 0pt;
																		"
																		role="presentation">
																		<span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>Ngày 14/06: </span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>Seminar “Designing Your Idea”</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			">
																		</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>(Online 19:00 - 21:15)</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>. Các bạn tham dự sẽ được bật mí về những yêu cầu đối với giải pháp,
                                                                            những tiêu chí quan trọng sẽ được giám khảo xem xét. Bên cạnh đó, diễn giả
                                                                            từ Baemin sẽ chia sẻ về những kỹ năng, kinh nghiệm trong việc thiết kế nên những giải pháp thiết thực.</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>.</span
																		>
																	</p>
																</li>
																<li
																	dir="ltr"
																	style="
																		list-style-type: disc;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	<p
																		dir="ltr"
																		style="
																			line-height: 1.872;
																			background-color: rgb(255, 255, 255);
																			margin-top: 0pt;
																			margin-bottom: 0pt;
																		"
																		role="presentation">
																		<span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>Ngày 17/06: </span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>Seminar “Presenting Your Idea”</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			">
																		</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>(Online 09:00 - 11:30)</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>. Những kỹ năng cần thiết để trình bày ý tưởng và chuyên nghiệp hoá sản phẩm như phong thái,
                                                                            nội dung khi thuyết trình, cách thiết kế slide... sẽ là những kiến thức, kĩ năng mà các bạn
                                                                            sẽ được trau dồi từ hoạt động seminar.</span
																		>
																	</p>
																</li>
																<li
																	dir="ltr"
																	style="
																		list-style-type: disc;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	<p
																		dir="ltr"
																		style="
																			line-height: 1.872;
																			background-color: rgb(255, 255, 255);
																			margin-top: 0pt;
																			margin-bottom: 0pt;
																		"
																		role="presentation">
																		<span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>Ngày 22/06: </span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>GIC Internal Presentation</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			">
																		</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>(Offline 08:00 - 14:30)</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>. Các đội thi sẽ lần lượt trình bày, ban
																			tổ chức sẽ chọn ra </span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>4 đội cho vòng thi chung kết. </span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>Kèm theo đó sẽ có thêm </span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>2 đội thi sẽ được bình chọn trực
																			tuyến</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			">
																			để tiến vào vòng chung kết.</span
																		>
																	</p>
																</li>
																<li
																	dir="ltr"
																	style="
																		list-style-type: disc;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	<p
																		dir="ltr"
																		style="
																			line-height: 1.872;
																			background-color: rgb(255, 255, 255);
																			margin-top: 0pt;
																			margin-bottom: 10pt;
																		"
																		role="presentation">
																		<span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>Ngày 25/06: </span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>GIC Idea Showcase</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			">
																		</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>(Offline 08:00 - 12:30)</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>. 6 đội được bình chọn trước đó sẽ trình
																			bày ý tưởng sau đó các khán giả và giám
																			khảo sẽ bình chọn cho đội thắng
																			cuộc.</span
																		>
																	</p>
																</li>
															</ul>
															<p
																dir="ltr"
																style="
																	line-height: 1.872;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																">
																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>Các sự kiện online sẽ được tổ chức thông qua
																	nền tảng </span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>Zoom:</span
																>
															</p>
															<ul
																style="
																	margin-top: 0px;
																	margin-bottom: 0px;
																	padding-inline-start: 48px;
																">
																<li
																	dir="ltr"
																	style="
																		list-style-type: disc;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	<p
																		dir="ltr"
																		style="
																			line-height: 1.872;
																			background-color: rgb(255, 255, 255);
																			margin-top: 0pt;
																			margin-bottom: 0pt;
																		"
																		role="presentation">
																		<span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>ID: 404 092 4271</span
																		>
																	</p>
																</li>
																<li
																	dir="ltr"
																	style="
																		list-style-type: disc;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	<p
																		dir="ltr"
																		style="
																			line-height: 1.872;
																			background-color: rgb(255, 255, 255);
																			margin-top: 0pt;
																			margin-bottom: 0pt;
																		"
																		role="presentation">
																		<span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>Password: g6azej</span
																		>
																	</p>
																</li>
																<li
																	dir="ltr"
																	style="
																		list-style-type: disc;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	<p
																		dir="ltr"
																		style="
																			line-height: 1.872;
																			background-color: rgb(255, 255, 255);
																			margin-top: 0pt;
																			margin-bottom: 10pt;
																		"
																		role="presentation">
																		<span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>Link: https://us02web.zoom.us/j/4040924271?pwd=cnhpZ0hNaThOL2JaYld0Unc3Zkxsdz09</span
																		>
																	</p>
																</li>
															</ul>
															<p
																dir="ltr"
																style="
																	line-height: 1.872;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																	padding: 0pt 0pt 10pt;
																">
																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>Với hai sự kiện </span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>GIC Internal Presentation </span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	(22/06) và </span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>GIC Idea Showcase </span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	(25/06) sẽ được tổ chức tại</span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	Nhà văn hóa sinh viên Đại học Quốc gia
																	TP. HCM</span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	vào các khung giờ nêu trên</span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>.</span
																>
															</p>
															<p
																dir="ltr"
																style="
																	line-height: 1.872;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																">
																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>Hãy chuẩn bị cho cuộc thi tốt nhất với những
																	ý tưởng mà các bạn đã ấp ủ. Không chỉ là ý
																	tưởng , trình bày và phản biện cũng sẽ là các
																	kĩ năng các bạn cần phải sở hữu để hoàn thiện
																	dự án. Hãy bắt đầu từ bây giờ, tận dụng mọi cơ
																	hội để giao lưu, chia sẻ và học hỏi sẽ là chìa
																	khóa dẫn đến chiến thắng của các bạn.</span
																>
															</p>
															<p
																dir="ltr"
																style="
																	line-height: 1.872;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																	padding: 10pt 0pt;
																">
																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>GIC: THiNK 2023</span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	giờ đây sẽ thêm tính cạnh tranh và thú vị hơn
																	bao giờ hết bởi có sự xuất hiện của các thành
																	viên từ đội </span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>${teamName}</span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	Bởi đó </span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>GDSC HCMUT</span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	và ban giám khảo sẽ rất mong chờ vào ý tưởng
																	của các bạn và cách các bạn sẽ hiện thực
																	chúng.</span
																>
															</p>
															<p
																dir="ltr"
																style="
																	line-height: 1.656;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																">
																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>Hy vọng các bạn đã sẵn sàng và tràn đầy năng
																	lượng để thử thách bản thân mình,</span
																>
															</p>
															<p
																dir="ltr"
																style="
																	line-height: 1.656;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																	padding: 10pt 0pt 0pt;
																">
																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>Chiến thắng./.</span
																>
															</p>
															<p
																dir="ltr"
																style="
																	line-height: 1.656;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																	padding: 0pt 0pt 10pt;
																">
																<span
																	style="
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-family: Arial;
																		font-weight: 700;
																		white-space: pre-wrap;
																		text-align: justify;
																	"
																	>--</span
																><br />
															</p>
															<span
																id="m_4733994766360779959m_7286841442065195665gmail-docs-internal-guid-0ee68f09-7fff-5ec6-0994-89a7bbb6040e"
																><p
																	dir="ltr"
																	style="
																		line-height: 1.38;
																		text-align: justify;
																		margin-top: 10pt;
																		margin-bottom: 0pt;
																	">
																	<span
																		style="
																			font-size: 13pt;
																			font-family: Arial;
																			color: rgb(66, 133, 244);
																			background-color: transparent;
																			font-weight: 700;
																			font-variant-numeric: normal;
																			font-variant-east-asian: normal;
																			font-variant-alternates: normal;
																			vertical-align: baseline;
																			white-space: pre-wrap;
																		"
																		>Google Developer Student Club - HCMUT</span
																	><span
																		style="
																			font-size: 13pt;
																			font-family: Arial;
																			color: rgb(66, 133, 244);
																			background-color: transparent;
																			font-weight: 700;
																			font-variant-numeric: normal;
																			font-variant-east-asian: normal;
																			font-variant-alternates: normal;
																		"
																		><br /></span
																	><span
																		style="
																			font-size: 11pt;
																			font-family: Arial;
																			color: rgb(85, 85, 85);
																			background-color: transparent;
																			font-variant-numeric: normal;
																			font-variant-east-asian: normal;
																			font-variant-alternates: normal;
																		"
																		>GDSC Idea Contest</span
																	>
																</p>
																<p
																	dir="ltr"
																	style="
																		line-height: 1.38;
																		text-align: justify;
																		margin-top: 0pt;
																		margin-bottom: 0pt;
																		padding: 10pt 0pt 0pt;
																	">
																	<span
																		style="
																			font-size: 10pt;
																			font-family: Arial;
																			color: rgb(85, 85, 85);
																			background-color: transparent;
																			font-weight: 700;
																			font-style: italic;
																			font-variant-numeric: normal;
																			font-variant-east-asian: normal;
																			font-variant-alternates: normal;
																		"
																		>Email: </span
																	><a
																		href="mailto:contact@gdschcmut.dev"
																		style="text-decoration-line: none"
																		target="_blank"
																		><span
																			style="
																				font-size: 10pt;
																				font-family: Arial;
																				background-color: transparent;
																				font-style: italic;
																				font-variant-numeric: normal;
																				font-variant-east-asian: normal;
																				font-variant-alternates: normal;
																				text-decoration-line: underline;
																			"
																			>contact@gdschcmut.dev</span
																		><span
																			style="
																				font-size: 10pt;
																				font-family: Arial;
																				color: rgb(66, 133, 244);
																				background-color: transparent;
																				font-style: italic;
																				font-variant-numeric: normal;
																				font-variant-east-asian: normal;
																				font-variant-alternates: normal;
																			"
																			><br /></span></a
																	><span
																		style="
																			font-size: 10pt;
																			font-family: Arial;
																			color: rgb(85, 85, 85);
																			background-color: transparent;
																			font-weight: 700;
																			font-style: italic;
																			font-variant-numeric: normal;
																			font-variant-east-asian: normal;
																			font-variant-alternates: normal;
																		"
																		>Facebook:</span
																	><a
																		href="https://www.facebook.com/dscxhcmut/"
																		style="text-decoration-line: none"
																		target="_blank"
																		data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/dscxhcmut/&amp;source=gmail&amp;ust=1684900982510000&amp;usg=AOvVaw2FhNYsuoPTXwbo4oBIDh0z"
																		><span
																			style="
																				font-size: 10pt;
																				font-family: Arial;
																				background-color: transparent;
																				font-weight: 700;
																				font-style: italic;
																				font-variant-numeric: normal;
																				font-variant-east-asian: normal;
																				font-variant-alternates: normal;
																				text-decoration-line: underline;
																			">
																		</span
																		><span
																			style="
																				font-size: 10pt;
																				font-family: Arial;
																				background-color: transparent;
																				font-style: italic;
																				font-variant-numeric: normal;
																				font-variant-east-asian: normal;
																				font-variant-alternates: normal;
																				text-decoration-line: underline;
																			"
																			>https://www.facebook.com/<wbr />dscxhcmut/</span
																		><span
																			style="
																				font-size: 10pt;
																				font-family: Arial;
																				color: rgb(85, 85, 85);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: italic;
																				font-variant-numeric: normal;
																				font-variant-east-asian: normal;
																				font-variant-alternates: normal;
																			"
																			><br /></span></a
																	><span
																		style="
																			font-size: 10pt;
																			font-family: Arial;
																			color: rgb(85, 85, 85);
																			background-color: transparent;
																			font-weight: 700;
																			font-style: italic;
																			font-variant-numeric: normal;
																			font-variant-east-asian: normal;
																			font-variant-alternates: normal;
																		"
																		>Address:</span
																	><span
																		style="
																			font-size: 10pt;
																			font-family: Arial;
																			color: rgb(85, 85, 85);
																			background-color: transparent;
																			font-style: italic;
																			font-variant-numeric: normal;
																			font-variant-east-asian: normal;
																			font-variant-alternates: normal;
																		">
																		268 Ly Thuong Kiet, Ward 14, District 10, Ho
																		Chi Minh City</span
																	>
																</p></span
															></span
														>
														<table
															cellspacing="0"
															cellpadding="0"
															border="0"
															width="100%">
															<tbody></tbody>
														</table>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>

								<tr>
									<td>
										<table
											cellspacing="0"
											cellpadding="0"
											border="0"
											width="100%">
											<tbody>
												<tr>
													<td
														style="
															background-color: #ffffff;
															border-top: 1px solid #f6f7f9;
															padding: 40px 0 40px;
															font-size: 13px;
															color: #7e8890;
														"
														align="center">
														<a
															href="https://streaklinks.com/BT8hHi6ERIjsu_ZJEAk4wpeN/https%3A%2F%2Fu16161593.ct.sendgrid.net%2Fls%2Fclick%3Fupn%3D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0Lwzg9C4VAJP20noOG84jTS0macmi_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utclyf2jsJXHRWfDwAkctFUwX73MYpmhWoeW8oW3o4G-2BckDWo-2B-2BpTWXVDLrSObETzmtUBODjGL1bz38mFGTyffJb25DGpaEGIiPTR7dq560VdIXaKAEBLq9sVl1-2B-2BRDKL4D0J2OAJTTFSYIs07rHvbIHw-3D-3D"
															target="_blank"
															data-saferedirecturl="https://www.google.com/url?q=https://streaklinks.com/BT8hHi6ERIjsu_ZJEAk4wpeN/https%253A%252F%252Fu16161593.ct.sendgrid.net%252Fls%252Fclick%253Fupn%253D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0Lwzg9C4VAJP20noOG84jTS0macmi_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utclyf2jsJXHRWfDwAkctFUwX73MYpmhWoeW8oW3o4G-2BckDWo-2B-2BpTWXVDLrSObETzmtUBODjGL1bz38mFGTyffJb25DGpaEGIiPTR7dq560VdIXaKAEBLq9sVl1-2B-2BRDKL4D0J2OAJTTFSYIs07rHvbIHw-3D-3D&amp;source=gmail&amp;ust=1684900982510000&amp;usg=AOvVaw1Jwrn-oNrRwokXitboWfK-"
															><img
																border="0"
																src="https://ci3.googleusercontent.com/proxy/1r-2vzVLcsXOpbFMuS1z_1wAHilkgE7VFmSK2du-iSEE9y_IDtifkp_7W6Tl0I8cWPm-LpQkJJjwV-MWuUOCR9f8ODWCK6t1yzb40sb10EICj67F2A3ZaCIPBmtk9CdzZCBQ65LpsCExriQv8CzuM_4vxPC8UCV_Q6zlmJ5gj3hTZ7ObfIF2nkBXNKBsxB_o8mlvE0HvKyviDRH3jOdMhZUE6f84W3J0mPP3uMuxWfT3vmV9IRKqPAQoC5WlegZTQnruwsQq3A=s0-d-e1-ft#https://res.cloudinary.com/startup-grind/image/upload/c_fit,dpr_2.0,f_auto,g_center,h_60,q_auto:good,w_500/v1/gcs/platform-data-dsc/contentbuilder/logo_dark_horizontal_WVttpzD.png"
																height="30"
														/></a>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
			</tbody>
		</table>

		<img
			style="
				height: 1px !important;
				width: 1px !important;
				border-width: 0 !important;
				margin-top: 0 !important;
				margin-bottom: 0 !important;
				margin-right: 0 !important;
				margin-left: 0 !important;
				padding-top: 0 !important;
				padding-bottom: 0 !important;
				padding-right: 0 !important;
				padding-left: 0 !important;
			"
			border="0"
			height="1"
			width="1"
			alt=""
			src="https://ci5.googleusercontent.com/proxy/TM6Pu1jLMfEZO_Tw9fwBSCQg-_Pi4GoWDRH35_cS3oyS5zEJY192JqakvAo1DhL-as5PJ4a6vXaGyc_RBmzAEefu_kEfQ-XVEkQdQyj7H1VrlFa69UU1OjU3_Nq59DjkomUOP8_HQ97JUvlJbMESxO44jsyhXKtDA5jqHp8nRcpNnT1B131kO5lyHPulNQAstGE4pzXGdMBFepwi7Ad_axpSVr6y0jKa1xQzBHoVFIAnSsT0hMIpgUdty2J68SHBvBw9vjZHvbqMNTIaVYPTEHITn5lzsWxlDmXnw3eRc7VG14OFYq_Yijz686eSRqmntwBjI-247ST5KR8mD3v1d0xvJEWIgzCDz3ulJCHPYJaYu3TTRcKeyak4C856HHnEaC3RSa0iRt0UgUUz7zGVufO6bzg8yMqiS5I=s0-d-e1-ft#https://u16161593.ct.sendgrid.net/wf/open?upn=f9BVIBTE4MV61d5WjyC1xRBeR2D0-2FN201XFXTlyGhGyQgyHSETzPOsJgbL-2B6iWKcS5VFV0WSwLBEXJd1jcrJJuKwQm68GVMxsvpPG6KQ1MJzOJFj03Z-2FRqTFChIYweOcYW9QeGejF3u-2F9B11dZqzfjxleppWee-2FQ7IDcefEpxjuVE12hEsfPoZJNwF1utRzsCPvDW4FPYrxy3On5PFdlWE7kzdkn5ZSFwW1Pu2CyJj4-3D" />
	</div>
	<br />
</div>
    `;
}

export function CONTEST_REGISTRATION_SUCCESSFUL_EMAIL(
    receiver: string,
    teamName: string,
) {
    return `
    <div dir="ltr">
	<div
		style="
			background-color: #f6f7f9;
			margin: 0;
			padding: 0;
			font-family: 'Open Sans', Arial, sans-serif !important;
			font-weight: 400;
			color: #202124;
		">
		<div></div>
		<table cellpadding="15" cellspacing="0" border="0" width="100%">
			<tbody>
				<tr>
					<td style="background-color: #f6f7f9" align="center" width="100%">
						<table
							style="
								border-bottom-left-radius: 4px;
								border-bottom-right-radius: 4px;
								overflow: hidden;
								min-width: 290px;
								max-width: 600px;
							"
							cellspacing="0"
							cellpadding="0"
							border="0">
							<tbody>
								<tr>
									<td>
										<table
											cellspacing="0"
											cellpadding="0"
											border="0"
											width="100%">
											<tbody>
												<tr>
													<td
														style="
															padding: 0 0 15px;
															font-family: 'Open Sans', Arial, sans-serif !important;
														"
														valign="middle">
														<a
															style="
																font-size: 12px;
																color: #6f6f6f !important;
																padding: 1px 0;
																text-decoration: none !important;
															"
															href="https://streaklinks.com/BT8hHi6i4sz87Zu_jgWlHBim/https%3A%2F%2Fu16161593.ct.sendgrid.net%2Fls%2Fclick%3Fupn%3D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0LwznXXv5-2BoPgUHFt4ZMWenhtzqm7TjwMiA-2FFAAcTgMmUzqjVEhGztoc3RXmIWr31f9U-3DI0CU_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utc0IXBPSuXDsulPt-2BMuYAqYyOAd83zZixxdWawNN-2BT-2BiEAS7-2Bs49aOD3vNf7i12oczTvTKAg7vnxumi6yz7-2BrLhBQeoo95o72ChUsisLrcxpHCbTdj3-2Fpf0KoNR-2B9tXM6uj3lrwEddbE5MTql81MA0wQ-3D-3D"
															target="_blank"
															data-saferedirecturl="https://www.google.com/url?q=https://streaklinks.com/BT8hHi6i4sz87Zu_jgWlHBim/https%253A%252F%252Fu16161593.ct.sendgrid.net%252Fls%252Fclick%253Fupn%253D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0LwznXXv5-2BoPgUHFt4ZMWenhtzqm7TjwMiA-2FFAAcTgMmUzqjVEhGztoc3RXmIWr31f9U-3DI0CU_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utc0IXBPSuXDsulPt-2BMuYAqYyOAd83zZixxdWawNN-2BT-2BiEAS7-2Bs49aOD3vNf7i12oczTvTKAg7vnxumi6yz7-2BrLhBQeoo95o72ChUsisLrcxpHCbTdj3-2Fpf0KoNR-2B9tXM6uj3lrwEddbE5MTql81MA0wQ-3D-3D&amp;source=gmail&amp;ust=1684900982510000&amp;usg=AOvVaw2hcgQx-yyLguam3pt8qVxw">
															Google Developer Student Clubs - VNU HCM -
															University of Technology
														</a>
													</td>

													<td
														style="
															padding: 0 0 15px;
															font-family: 'Open Sans', Arial, sans-serif !important;
														"
														valign="middle"
														align="right">
														<br />
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>

								<tr>
									<td
										style="
											width: 600px;
											height: 136px;
											vertical-align: middle;
											border-bottom: 0px solid #f6f7f9;
											background-image: url(https://ci3.googleusercontent.com/proxy/jTbSl0_Srn4p-vihHLXnamvPIRqeZxUV8BUKAc3K9e9SGOUfkrvcSD4lXc-hrT8Xy6TJTpGAoO1_1YQhcYJhuyEUTFyhmZKHILgw709SiBMN2jTydWgf-PLxJc7UJrg8BTjB7aVfi1k1LjsoJov1dIrrxeNjzDGWSWctWk0mu2U2Ob7UM1QWU8BrNTkvaA8PdcQqyhXjlHU-J7n3k5vcCTHI6QZno8Eei93sXQGLfNiw_9nWGxWmgA=s0-d-e1-ft#https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,h_135,q_auto:eco,w_600/v1/gcs/platform-data-dsc/contentbuilder/email_header.png);
											background-color: #fff;
											border-top-right-radius: 4px;
											border-top-left-radius: 4px;
											background-size: cover;
										">
										<table
											style="width: 100%"
											width="100%"
											cellspacing="20"
											cellpadding="0"
											border="0">
											<tbody>
												<tr>
													<td
														style="vertical-align: middle; text-align: center">
														<div style="display: inline-block">
															<a
																style="text-align: center; display: block"
																href="https://streaklinks.com/BT8hHi6PT1YYETjglwM_Hm9E/https%3A%2F%2Fu16161593.ct.sendgrid.net%2Fls%2Fclick%3Fupn%3D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0LwznXXv5-2BoPgUHFt4ZMWenhtzqm7TjwMiA-2FFAAcTgMmUzqjVEhGztoc3RXmIWr31f9U-3D1WWW_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utcOdQF6JS3ei-2Fi-2B544Dvf86oqppqJ8ierQQhGgjkxucq7fumdIZnstg-2BFUndpO-2FfxP4Ly3TP4GzCOy9ht90I8WESMt6kPH7KOOCcKJJqWM79bCah4CxTulb6AN7wK5cJ2S-2FdFuFhMq1xCBL1vObinRiQ-3D-3D"
																target="_blank"
																data-saferedirecturl="https://www.google.com/url?q=https://streaklinks.com/BT8hHi6PT1YYETjglwM_Hm9E/https%253A%252F%252Fu16161593.ct.sendgrid.net%252Fls%252Fclick%253Fupn%253D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0LwznXXv5-2BoPgUHFt4ZMWenhtzqm7TjwMiA-2FFAAcTgMmUzqjVEhGztoc3RXmIWr31f9U-3D1WWW_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utcOdQF6JS3ei-2Fi-2B544Dvf86oqppqJ8ierQQhGgjkxucq7fumdIZnstg-2BFUndpO-2FfxP4Ly3TP4GzCOy9ht90I8WESMt6kPH7KOOCcKJJqWM79bCah4CxTulb6AN7wK5cJ2S-2FdFuFhMq1xCBL1vObinRiQ-3D-3D&amp;source=gmail&amp;ust=1684900982510000&amp;usg=AOvVaw3gBg_MMpNAgWKpAVsRMA0Y">
																<img
																	height="50"
																	border="0"
																	alt="Google Developer Student Clubs"
																	src="https://ci3.googleusercontent.com/proxy/wEsj66QGvdQacrMw4Qm3A1r-Gbyd3Uz7XY2HRkhxyXCxKpzCzuqi2KlBu70FVmRXCvpd7HqgnKJFFW2ga4xiGnLgF1jjWDvQfTAgMBbC_onFujTrhFAl99zrDBLsS6moSRMG2EAHgFGRL2dLMbG-0GkgcVd3pOEeeTJzZzhI6CuspG6FeRi177hNC7sRe2INLGkoVoVMrgzZhPiZs4HnGot13yae4p1VnyKpydIqCwul8OV7wDdlCBT8EQ9K6HTlNVMM49A=s0-d-e1-ft#https://res.cloudinary.com/startup-grind/image/upload/c_fit,dpr_2.0,f_auto,g_center,h_100,q_auto:good,w_500/v1/gcs/platform-data-dsc/contentbuilder/logo_dark_stacked_ziDh4mP.png" />
															</a>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>

								<tr>
									<td style="padding-top: 1px">
										<table
											cellspacing="0"
											cellpadding="0"
											border="0"
											width="100%">
											<tbody>
												<tr>
													<td
														style="
															background-color: #fff;
															padding: 25px 35px;
															text-align: left;
															font-family: 'Open Sans', Arial, sans-serif !important;
															font-size: 14px;
															line-height: 20px;
														"
														align="center"
														valign="top">
														<span
															id="m_4733994766360779959m_7286841442065195665m_-7246610426249120709gmail-docs-internal-guid-1795923a-7fff-3ee5-47f8-07a4555c096e"
															><p
																dir="ltr"
																style="
																	line-height: 1.656;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																	padding: 0pt 0pt 10pt;
																">
																<span
																	style="
																		font-variant-numeric: normal;
																		font-variant-east-asian: normal;
																		font-variant-alternates: normal;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																	"
																	>Xin chào </span
																><span
																	style="
																		font-variant-numeric: normal;
																		font-variant-east-asian: normal;
																		font-variant-alternates: normal;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																	"
																	>${receiver}</span
																><span
																	style="
																		font-variant-numeric: normal;
																		font-variant-east-asian: normal;
																		font-variant-alternates: normal;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																	"
																	>,</span
																><br />
															</p>
															<p
																dir="ltr"
																style="
																	line-height: 1.872;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																	padding: 0pt 0pt 10pt;
																">
																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>Chúc mừng đội </span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>${teamName}</span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	đã đăng ký thành công và trở thành một phần
																	của cuộc thi GDSC Idea Contest: THiNK
																	2023.&nbsp;</span
																>
															</p>
															<p
																dir="ltr"
																style="
																	line-height: 1.872;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																	padding: 0pt 0pt 10pt;
																">
																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>Thông tin của các đội thi sẽ được cập nhật ở
																	website cuộc thi </span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	><a href="https://${IS_PRODUCTION ? '' : 'dev.'}gdsc.app/contestant">tại đây</a></span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
                                                                >. Bên cạnh đó cũng có những mốc thời gian và
																	địa điểm mà các bạn phải lưu ý để tránh bỏ lỡ
																	nhé:</span>
															</p>
															<ul
																style="
																	margin-top: 0px;
																	margin-bottom: 0px;
																	padding-inline-start: 48px;
																">
																<li
																	dir="ltr"
																	style="
																		list-style-type: disc;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	<p
																		dir="ltr"
																		style="
																			line-height: 1.872;
																			background-color: rgb(255, 255, 255);
																			margin-top: 0pt;
																			margin-bottom: 0pt;
																		"
																		role="presentation">
																		<span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>Ngày 11/06: </span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>GIC Opening day</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			">
																		</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>(Online 09:00 - 11:25)</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>. Nội dung, giải thưởng cũng như mục tiêu của cuộc thi sẽ được phổ biến cho các thí sinh.
                                                                            Ngoài ra, sự kiện còn đem đến cho mọi người chuyên mục “Fireside chat”, một hoạt động trò chuyện,
                                                                            đặt câu hỏi và lắng nghe những chia sẻ từ diễn giả về việc thiết kế, phát triển các giải pháp thiết thực.</span
																		>
																	</p>
																</li>
																<li
																	dir="ltr"
																	style="
																		list-style-type: disc;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	<p
																		dir="ltr"
																		style="
																			line-height: 1.872;
																			background-color: rgb(255, 255, 255);
																			margin-top: 0pt;
																			margin-bottom: 0pt;
																		"
																		role="presentation">
																		<span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>Ngày 14/06: </span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>Seminar “Designing Your Idea”</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			">
																		</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>(Online 19:00 - 21:15)</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>. Các bạn tham dự sẽ được bật mí về những yêu cầu đối với giải pháp,
                                                                            những tiêu chí quan trọng sẽ được giám khảo xem xét. Bên cạnh đó,
                                                                            diễn giả từ Baemin sẽ chia sẻ về những kỹ năng, kinh nghiệm trong
                                                                            việc thiết kế nên những giải pháp thiết thực.</span
																		>
																	</p>
																</li>
																<li
																	dir="ltr"
																	style="
																		list-style-type: disc;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	<p
																		dir="ltr"
																		style="
																			line-height: 1.872;
																			background-color: rgb(255, 255, 255);
																			margin-top: 0pt;
																			margin-bottom: 0pt;
																		"
																		role="presentation">
																		<span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>Ngày 17/06: </span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>Seminar “Presenting Your Idea”</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			">
																		</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>(Online 09:00 - 11:30)</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>. Những kỹ năng cần thiết để trình bày ý tưởng và chuyên nghiệp
                                                                            hoá sản phẩm như phong thái, nội dung khi thuyết trình, cách thiết kế slide...
                                                                            sẽ là những kiến thức, kĩ năng mà các bạn sẽ được trau dồi từ hoạt động seminar.</span
																		>
																	</p>
																</li>
																<li
																	dir="ltr"
																	style="
																		list-style-type: disc;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	<p
																		dir="ltr"
																		style="
																			line-height: 1.872;
																			background-color: rgb(255, 255, 255);
																			margin-top: 0pt;
																			margin-bottom: 0pt;
																		"
																		role="presentation">
																		<span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>Ngày 22/06: </span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>GIC Internal Presentation</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			">
																		</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>(Offline 08:00 - 14:30)</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>. Các đội thi sẽ lần lượt trình bày, ban
																			tổ chức sẽ chọn ra </span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>4 đội cho vòng thi chung kết. </span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>Kèm theo đó sẽ có thêm </span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>2 đội thi sẽ được bình chọn trực
																			tuyến</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			">
																			để tiến vào vòng chung kết.</span
																		>
																	</p>
																</li>
																<li
																	dir="ltr"
																	style="
																		list-style-type: disc;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	<p
																		dir="ltr"
																		style="
																			line-height: 1.872;
																			background-color: rgb(255, 255, 255);
																			margin-top: 0pt;
																			margin-bottom: 10pt;
																		"
																		role="presentation">
																		<span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>Ngày 25/06: </span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>GIC Idea Showcase</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			">
																		</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>(Offline 08:00 - 12:30)</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>. 6 đội được bình chọn trước đó sẽ trình
																			bày ý tưởng sau đó các khán giả và giám
																			khảo sẽ bình chọn cho đội thắng
																			cuộc.</span
																		>
																	</p>
																</li>
															</ul>
															<p
																dir="ltr"
																style="
																	line-height: 1.872;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																">
																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>Các sự kiện online sẽ được tổ chức thông qua
																	nền tảng </span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>Zoom:</span
																>
															</p>
															<ul
																style="
																	margin-top: 0px;
																	margin-bottom: 0px;
																	padding-inline-start: 48px;
																">
																<li
																	dir="ltr"
																	style="
																		list-style-type: disc;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	<p
																		dir="ltr"
																		style="
																			line-height: 1.872;
																			background-color: rgb(255, 255, 255);
																			margin-top: 0pt;
																			margin-bottom: 0pt;
																		"
																		role="presentation">
																		<span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>ID: 404 092 4271</span
																		>
																	</p>
																</li>
																<li
																	dir="ltr"
																	style="
																		list-style-type: disc;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	<p
																		dir="ltr"
																		style="
																			line-height: 1.872;
																			background-color: rgb(255, 255, 255);
																			margin-top: 0pt;
																			margin-bottom: 0pt;
																		"
																		role="presentation">
																		<span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>Password: g6azej</span
																		>
																	</p>
																</li>
																<li
																	dir="ltr"
																	style="
																		list-style-type: disc;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	<p
																		dir="ltr"
																		style="
																			line-height: 1.872;
																			background-color: rgb(255, 255, 255);
																			margin-top: 0pt;
																			margin-bottom: 10pt;
																		"
																		role="presentation">
																		<span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>Link: https://us02web.zoom.us/j/4040924271?pwd=cnhpZ0hNaThOL2JaYld0Unc3Zkxsdz09</span
																		>
																	</p>
																</li>
															</ul>
															<p
																dir="ltr"
																style="
																	line-height: 1.872;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																	padding: 0pt 0pt 10pt;
																">
																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>Với hai sự kiện </span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>GIC Internal Presentation </span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	(22/06) và </span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>GIC Idea Showcase (25/06) </span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	sẽ được tổ chức tại</span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	Nhà văn hóa sinh viên Đại học Quốc gia
																	TP.HCM</span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	vào các khung giờ nêu trên</span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>.</span
																>
															</p>
															<p
																dir="ltr"
																style="
																	line-height: 1.872;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																">
																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>Hãy chuẩn bị cho cuộc thi tốt nhất với những
																	ý tưởng mà các bạn đã ấp ủ. Không chỉ là ý
																	tưởng , trình bày và phản biện cũng sẽ là các
																	kĩ năng các bạn cần phải sở hữu để hoàn thiện
																	dự án. Hãy bắt đầu từ bây giờ, tận dụng mọi cơ
																	hội để giao lưu, chia sẻ và học hỏi sẽ là chìa
																	khóa dẫn đến chiến thắng của các bạn.</span
																>
															</p>
															<p
																dir="ltr"
																style="
																	line-height: 1.872;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																	padding: 10pt 0pt;
																">
																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>GIC: THiNK 2023</span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	giờ đây sẽ thêm tính cạnh tranh và thú vị hơn
																	bao giờ hết bởi có sự xuất hiện của các thành
																	viên từ đội </span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>${teamName}</span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	Bởi đó </span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>GDSC HCMUT</span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	và ban giám khảo sẽ rất mong chờ vào ý tưởng
																	của các bạn và cách các bạn sẽ hiện thực
																	chúng.</span
																>
															</p>
															<p
																dir="ltr"
																style="
																	line-height: 1.656;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																">
																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>Hy vọng các bạn đã sẵn sàng và tràn đầy năng
																	lượng để thử thách bản thân mình,</span
																>
															</p>
															<p
																dir="ltr"
																style="
																	line-height: 1.656;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																	padding: 10pt 0pt 0pt;
																">
																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>Chiến thắng./.</span
																>
															</p>
															<p
																dir="ltr"
																style="
																	line-height: 1.656;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																	padding: 0pt 0pt 10pt;
																">
																<span
																	style="
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-family: Arial;
																		font-weight: 700;
																		white-space: pre-wrap;
																		text-align: justify;
																	"
																	>--</span
																><br />
															</p>
															<span
																id="m_4733994766360779959m_7286841442065195665gmail-docs-internal-guid-0ee68f09-7fff-5ec6-0994-89a7bbb6040e"
																><p
																	dir="ltr"
																	style="
																		line-height: 1.38;
																		text-align: justify;
																		margin-top: 10pt;
																		margin-bottom: 0pt;
																	">
																	<span
																		style="
																			font-size: 13pt;
																			font-family: Arial;
																			color: rgb(66, 133, 244);
																			background-color: transparent;
																			font-weight: 700;
																			font-variant-numeric: normal;
																			font-variant-east-asian: normal;
																			font-variant-alternates: normal;
																			vertical-align: baseline;
																			white-space: pre-wrap;
																		"
																		>Google Developer Student Club - HCMUT</span
																	><span
																		style="
																			font-size: 13pt;
																			font-family: Arial;
																			color: rgb(66, 133, 244);
																			background-color: transparent;
																			font-weight: 700;
																			font-variant-numeric: normal;
																			font-variant-east-asian: normal;
																			font-variant-alternates: normal;
																		"
																		><br /></span
																	><span
																		style="
																			font-size: 11pt;
																			font-family: Arial;
																			color: rgb(85, 85, 85);
																			background-color: transparent;
																			font-variant-numeric: normal;
																			font-variant-east-asian: normal;
																			font-variant-alternates: normal;
																		"
																		>GDSC Idea Contest</span
																	>
																</p>
																<p
																	dir="ltr"
																	style="
																		line-height: 1.38;
																		text-align: justify;
																		margin-top: 0pt;
																		margin-bottom: 0pt;
																		padding: 10pt 0pt 0pt;
																	">
																	<span
																		style="
																			font-size: 10pt;
																			font-family: Arial;
																			color: rgb(85, 85, 85);
																			background-color: transparent;
																			font-weight: 700;
																			font-style: italic;
																			font-variant-numeric: normal;
																			font-variant-east-asian: normal;
																			font-variant-alternates: normal;
																		"
																		>Email: </span
																	><a
																		href="mailto:contact@gdschcmut.dev"
																		style="text-decoration-line: none"
																		target="_blank"
																		><span
																			style="
																				font-size: 10pt;
																				font-family: Arial;
																				background-color: transparent;
																				font-style: italic;
																				font-variant-numeric: normal;
																				font-variant-east-asian: normal;
																				font-variant-alternates: normal;
																				text-decoration-line: underline;
																			"
																			>contact@gdschcmut.dev</span
																		><span
																			style="
																				font-size: 10pt;
																				font-family: Arial;
																				color: rgb(66, 133, 244);
																				background-color: transparent;
																				font-style: italic;
																				font-variant-numeric: normal;
																				font-variant-east-asian: normal;
																				font-variant-alternates: normal;
																			"
																			><br /></span></a
																	><span
																		style="
																			font-size: 10pt;
																			font-family: Arial;
																			color: rgb(85, 85, 85);
																			background-color: transparent;
																			font-weight: 700;
																			font-style: italic;
																			font-variant-numeric: normal;
																			font-variant-east-asian: normal;
																			font-variant-alternates: normal;
																		"
																		>Facebook:</span
																	><a
																		href="https://www.facebook.com/dscxhcmut/"
																		style="text-decoration-line: none"
																		target="_blank"
																		data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/dscxhcmut/&amp;source=gmail&amp;ust=1684900982510000&amp;usg=AOvVaw2FhNYsuoPTXwbo4oBIDh0z"
																		><span
																			style="
																				font-size: 10pt;
																				font-family: Arial;
																				background-color: transparent;
																				font-weight: 700;
																				font-style: italic;
																				font-variant-numeric: normal;
																				font-variant-east-asian: normal;
																				font-variant-alternates: normal;
																				text-decoration-line: underline;
																			">
																		</span
																		><span
																			style="
																				font-size: 10pt;
																				font-family: Arial;
																				background-color: transparent;
																				font-style: italic;
																				font-variant-numeric: normal;
																				font-variant-east-asian: normal;
																				font-variant-alternates: normal;
																				text-decoration-line: underline;
																			"
																			>https://www.facebook.com/<wbr />dscxhcmut/</span
																		><span
																			style="
																				font-size: 10pt;
																				font-family: Arial;
																				color: rgb(85, 85, 85);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: italic;
																				font-variant-numeric: normal;
																				font-variant-east-asian: normal;
																				font-variant-alternates: normal;
																			"
																			><br /></span></a
																	><span
																		style="
																			font-size: 10pt;
																			font-family: Arial;
																			color: rgb(85, 85, 85);
																			background-color: transparent;
																			font-weight: 700;
																			font-style: italic;
																			font-variant-numeric: normal;
																			font-variant-east-asian: normal;
																			font-variant-alternates: normal;
																		"
																		>Address:</span
																	><span
																		style="
																			font-size: 10pt;
																			font-family: Arial;
																			color: rgb(85, 85, 85);
																			background-color: transparent;
																			font-style: italic;
																			font-variant-numeric: normal;
																			font-variant-east-asian: normal;
																			font-variant-alternates: normal;
																		">
																		268 Ly Thuong Kiet, Ward 14, District 10, Ho
																		Chi Minh City</span
																	>
																</p></span
															></span
														>
														<table
															cellspacing="0"
															cellpadding="0"
															border="0"
															width="100%">
															<tbody></tbody>
														</table>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>

								<tr>
									<td>
										<table
											cellspacing="0"
											cellpadding="0"
											border="0"
											width="100%">
											<tbody>
												<tr>
													<td
														style="
															background-color: #ffffff;
															border-top: 1px solid #f6f7f9;
															padding: 40px 0 40px;
															font-size: 13px;
															color: #7e8890;
														"
														align="center">
														<a
															href="https://streaklinks.com/BT8hHi6ERIjsu_ZJEAk4wpeN/https%3A%2F%2Fu16161593.ct.sendgrid.net%2Fls%2Fclick%3Fupn%3D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0Lwzg9C4VAJP20noOG84jTS0macmi_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utclyf2jsJXHRWfDwAkctFUwX73MYpmhWoeW8oW3o4G-2BckDWo-2B-2BpTWXVDLrSObETzmtUBODjGL1bz38mFGTyffJb25DGpaEGIiPTR7dq560VdIXaKAEBLq9sVl1-2B-2BRDKL4D0J2OAJTTFSYIs07rHvbIHw-3D-3D"
															target="_blank"
															data-saferedirecturl="https://www.google.com/url?q=https://streaklinks.com/BT8hHi6ERIjsu_ZJEAk4wpeN/https%253A%252F%252Fu16161593.ct.sendgrid.net%252Fls%252Fclick%253Fupn%253D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0Lwzg9C4VAJP20noOG84jTS0macmi_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utclyf2jsJXHRWfDwAkctFUwX73MYpmhWoeW8oW3o4G-2BckDWo-2B-2BpTWXVDLrSObETzmtUBODjGL1bz38mFGTyffJb25DGpaEGIiPTR7dq560VdIXaKAEBLq9sVl1-2B-2BRDKL4D0J2OAJTTFSYIs07rHvbIHw-3D-3D&amp;source=gmail&amp;ust=1684900982510000&amp;usg=AOvVaw1Jwrn-oNrRwokXitboWfK-"
															><img
																border="0"
																src="https://ci3.googleusercontent.com/proxy/1r-2vzVLcsXOpbFMuS1z_1wAHilkgE7VFmSK2du-iSEE9y_IDtifkp_7W6Tl0I8cWPm-LpQkJJjwV-MWuUOCR9f8ODWCK6t1yzb40sb10EICj67F2A3ZaCIPBmtk9CdzZCBQ65LpsCExriQv8CzuM_4vxPC8UCV_Q6zlmJ5gj3hTZ7ObfIF2nkBXNKBsxB_o8mlvE0HvKyviDRH3jOdMhZUE6f84W3J0mPP3uMuxWfT3vmV9IRKqPAQoC5WlegZTQnruwsQq3A=s0-d-e1-ft#https://res.cloudinary.com/startup-grind/image/upload/c_fit,dpr_2.0,f_auto,g_center,h_60,q_auto:good,w_500/v1/gcs/platform-data-dsc/contentbuilder/logo_dark_horizontal_WVttpzD.png"
																height="30"
														/></a>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
			</tbody>
		</table>

		<img
			style="
				height: 1px !important;
				width: 1px !important;
				border-width: 0 !important;
				margin-top: 0 !important;
				margin-bottom: 0 !important;
				margin-right: 0 !important;
				margin-left: 0 !important;
				padding-top: 0 !important;
				padding-bottom: 0 !important;
				padding-right: 0 !important;
				padding-left: 0 !important;
			"
			border="0"
			height="1"
			width="1"
			alt=""
			src="https://ci5.googleusercontent.com/proxy/TM6Pu1jLMfEZO_Tw9fwBSCQg-_Pi4GoWDRH35_cS3oyS5zEJY192JqakvAo1DhL-as5PJ4a6vXaGyc_RBmzAEefu_kEfQ-XVEkQdQyj7H1VrlFa69UU1OjU3_Nq59DjkomUOP8_HQ97JUvlJbMESxO44jsyhXKtDA5jqHp8nRcpNnT1B131kO5lyHPulNQAstGE4pzXGdMBFepwi7Ad_axpSVr6y0jKa1xQzBHoVFIAnSsT0hMIpgUdty2J68SHBvBw9vjZHvbqMNTIaVYPTEHITn5lzsWxlDmXnw3eRc7VG14OFYq_Yijz686eSRqmntwBjI-247ST5KR8mD3v1d0xvJEWIgzCDz3ulJCHPYJaYu3TTRcKeyak4C856HHnEaC3RSa0iRt0UgUUz7zGVufO6bzg8yMqiS5I=s0-d-e1-ft#https://u16161593.ct.sendgrid.net/wf/open?upn=f9BVIBTE4MV61d5WjyC1xRBeR2D0-2FN201XFXTlyGhGyQgyHSETzPOsJgbL-2B6iWKcS5VFV0WSwLBEXJd1jcrJJuKwQm68GVMxsvpPG6KQ1MJzOJFj03Z-2FRqTFChIYweOcYW9QeGejF3u-2F9B11dZqzfjxleppWee-2FQ7IDcefEpxjuVE12hEsfPoZJNwF1utRzsCPvDW4FPYrxy3On5PFdlWE7kzdkn5ZSFwW1Pu2CyJj4-3D" />
	</div>
	<br />
</div>
    `;
}

export function DAY_1_3_REGISTRATION_SUCCESSFUL_EMAIL(
    receiver: string,
    eventDate: string,
    eventName: string,
    eventTime: string,
    eventDescription: string,
) {
    return `
    <div dir="ltr">
	<div
		style="
			background-color: #f6f7f9;
			margin: 0;
			padding: 0;
			font-family: 'Open Sans', Arial, sans-serif !important;
			font-weight: 400;
			color: #202124;
		">
		<div></div>
		<table cellpadding="15" cellspacing="0" border="0" width="100%">
			<tbody>
				<tr>
					<td style="background-color: #f6f7f9" align="center" width="100%">
						<table
							style="
								border-bottom-left-radius: 4px;
								border-bottom-right-radius: 4px;
								overflow: hidden;
								min-width: 290px;
								max-width: 600px;
							"
							cellspacing="0"
							cellpadding="0"
							border="0">
							<tbody>
								<tr>
									<td>
										<table
											cellspacing="0"
											cellpadding="0"
											border="0"
											width="100%">
											<tbody>
												<tr>
													<td
														style="
															padding: 0 0 15px;
															font-family: 'Open Sans', Arial, sans-serif !important;
														"
														valign="middle">
														<a
															style="
																font-size: 12px;
																color: #6f6f6f !important;
																padding: 1px 0;
																text-decoration: none !important;
															"
															href="https://streaklinks.com/BT8hHi6i4sz87Zu_jgWlHBim/https%3A%2F%2Fu16161593.ct.sendgrid.net%2Fls%2Fclick%3Fupn%3D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0LwznXXv5-2BoPgUHFt4ZMWenhtzqm7TjwMiA-2FFAAcTgMmUzqjVEhGztoc3RXmIWr31f9U-3DI0CU_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utc0IXBPSuXDsulPt-2BMuYAqYyOAd83zZixxdWawNN-2BT-2BiEAS7-2Bs49aOD3vNf7i12oczTvTKAg7vnxumi6yz7-2BrLhBQeoo95o72ChUsisLrcxpHCbTdj3-2Fpf0KoNR-2B9tXM6uj3lrwEddbE5MTql81MA0wQ-3D-3D"
															target="_blank"
															data-saferedirecturl="https://www.google.com/url?q=https://streaklinks.com/BT8hHi6i4sz87Zu_jgWlHBim/https%253A%252F%252Fu16161593.ct.sendgrid.net%252Fls%252Fclick%253Fupn%253D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0LwznXXv5-2BoPgUHFt4ZMWenhtzqm7TjwMiA-2FFAAcTgMmUzqjVEhGztoc3RXmIWr31f9U-3DI0CU_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utc0IXBPSuXDsulPt-2BMuYAqYyOAd83zZixxdWawNN-2BT-2BiEAS7-2Bs49aOD3vNf7i12oczTvTKAg7vnxumi6yz7-2BrLhBQeoo95o72ChUsisLrcxpHCbTdj3-2Fpf0KoNR-2B9tXM6uj3lrwEddbE5MTql81MA0wQ-3D-3D&amp;source=gmail&amp;ust=1684859221061000&amp;usg=AOvVaw0ezGJtM5x-bu-b1w1OTady">
															Google Developer Student Clubs - VNU HCM -
															University of Technology
														</a>
													</td>

													<td
														style="
															padding: 0 0 15px;
															font-family: 'Open Sans', Arial, sans-serif !important;
														"
														valign="middle"
														align="right">
														<br />
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>

								<tr>
									<td
										style="
											width: 600px;
											height: 136px;
											vertical-align: middle;
											border-bottom: 0px solid #f6f7f9;
											background-image: url(https://ci3.googleusercontent.com/proxy/jTbSl0_Srn4p-vihHLXnamvPIRqeZxUV8BUKAc3K9e9SGOUfkrvcSD4lXc-hrT8Xy6TJTpGAoO1_1YQhcYJhuyEUTFyhmZKHILgw709SiBMN2jTydWgf-PLxJc7UJrg8BTjB7aVfi1k1LjsoJov1dIrrxeNjzDGWSWctWk0mu2U2Ob7UM1QWU8BrNTkvaA8PdcQqyhXjlHU-J7n3k5vcCTHI6QZno8Eei93sXQGLfNiw_9nWGxWmgA=s0-d-e1-ft#https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,h_135,q_auto:eco,w_600/v1/gcs/platform-data-dsc/contentbuilder/email_header.png);
											background-color: #fff;
											border-top-right-radius: 4px;
											border-top-left-radius: 4px;
											background-size: cover;
										">
										<table
											style="width: 100%"
											width="100%"
											cellspacing="20"
											cellpadding="0"
											border="0">
											<tbody>
												<tr>
													<td
														style="vertical-align: middle; text-align: center">
														<div style="display: inline-block">
															<a
																style="text-align: center; display: block"
																href="https://streaklinks.com/BT8hHi6PT1YYETjglwM_Hm9E/https%3A%2F%2Fu16161593.ct.sendgrid.net%2Fls%2Fclick%3Fupn%3D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0LwznXXv5-2BoPgUHFt4ZMWenhtzqm7TjwMiA-2FFAAcTgMmUzqjVEhGztoc3RXmIWr31f9U-3D1WWW_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utcOdQF6JS3ei-2Fi-2B544Dvf86oqppqJ8ierQQhGgjkxucq7fumdIZnstg-2BFUndpO-2FfxP4Ly3TP4GzCOy9ht90I8WESMt6kPH7KOOCcKJJqWM79bCah4CxTulb6AN7wK5cJ2S-2FdFuFhMq1xCBL1vObinRiQ-3D-3D"
																target="_blank"
																data-saferedirecturl="https://www.google.com/url?q=https://streaklinks.com/BT8hHi6PT1YYETjglwM_Hm9E/https%253A%252F%252Fu16161593.ct.sendgrid.net%252Fls%252Fclick%253Fupn%253D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0LwznXXv5-2BoPgUHFt4ZMWenhtzqm7TjwMiA-2FFAAcTgMmUzqjVEhGztoc3RXmIWr31f9U-3D1WWW_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utcOdQF6JS3ei-2Fi-2B544Dvf86oqppqJ8ierQQhGgjkxucq7fumdIZnstg-2BFUndpO-2FfxP4Ly3TP4GzCOy9ht90I8WESMt6kPH7KOOCcKJJqWM79bCah4CxTulb6AN7wK5cJ2S-2FdFuFhMq1xCBL1vObinRiQ-3D-3D&amp;source=gmail&amp;ust=1684859221061000&amp;usg=AOvVaw1a4Y44IdmJtY8kY9E4zhOL">
																<img
																	height="50"
																	border="0"
																	alt="Google Developer Student Clubs"
																	src="https://ci3.googleusercontent.com/proxy/wEsj66QGvdQacrMw4Qm3A1r-Gbyd3Uz7XY2HRkhxyXCxKpzCzuqi2KlBu70FVmRXCvpd7HqgnKJFFW2ga4xiGnLgF1jjWDvQfTAgMBbC_onFujTrhFAl99zrDBLsS6moSRMG2EAHgFGRL2dLMbG-0GkgcVd3pOEeeTJzZzhI6CuspG6FeRi177hNC7sRe2INLGkoVoVMrgzZhPiZs4HnGot13yae4p1VnyKpydIqCwul8OV7wDdlCBT8EQ9K6HTlNVMM49A=s0-d-e1-ft#https://res.cloudinary.com/startup-grind/image/upload/c_fit,dpr_2.0,f_auto,g_center,h_100,q_auto:good,w_500/v1/gcs/platform-data-dsc/contentbuilder/logo_dark_stacked_ziDh4mP.png" />
															</a>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>

								<tr>
									<td style="padding-top: 1px">
										<table
											cellspacing="0"
											cellpadding="0"
											border="0"
											width="100%">
											<tbody>
												<tr>
													<td
														style="
															background-color: #fff;
															padding: 25px 35px;
															text-align: left;
															font-family: 'Open Sans', Arial, sans-serif !important;
															font-size: 14px;
															line-height: 20px;
														"
														align="center"
														valign="top">
														<span
															id="m_-5174430959820603938m_8590484024401273439m_-7246610426249120709gmail-docs-internal-guid-1795923a-7fff-3ee5-47f8-07a4555c096e"
															><p
																dir="ltr"
																style="
																	line-height: 1.656;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																	padding: 0pt 0pt 10pt;
																">
																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>Xin chào </span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>${receiver}</span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>,</span
																>
															</p>
															<p
																dir="ltr"
																style="
																	line-height: 1.872;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																	padding: 0pt 0pt 10pt;
																">
																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>Chúc mừng </span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>${receiver}</span
																>

																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	đã đăng ký thành công và trở thành một phần
																	của của sự kiện </span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>${eventName} </span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>trong chuỗi </span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>GDSC Idea Contest: THiNK 2023. </span
																>
															<p
																dir="ltr"
																style="
																	line-height: 1.872;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 10pt;
																">
																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>GIC: THiNK 2023</span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	giờ đây sẽ thêm thú vị hơn bởi có sự xuất hiện
																	bạn. Đừng quên những thông tin của sự kiện bạn
																	đã đăng ký nhé:</span
																>
															</p>
															<ul
																style="
																	margin-top: 0px;
																	margin-bottom: 0px;
																	padding-inline-start: 48px;
																">
																<li
																	dir="ltr"
																	style="
																		list-style-type: disc;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	<p
																		dir="ltr"
																		style="
																			line-height: 1.872;
																			background-color: rgb(255, 255, 255);
																			margin-top: 0pt;
																			margin-bottom: 10pt;
																		"
																		role="presentation">
																		<span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>Ngày ${eventDate}: </span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>${eventName}</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			">
																		</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>(${eventTime})</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>. ${eventDescription}</span
																		>
																	</p>
																</li>
															</ul>
															<p
																dir="ltr"
																style="
																	line-height: 1.872;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																">
																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>Đối với các sự kiện online sẽ được tổ chức
																	thông qua nền tảng </span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>Zoom:</span
																>
															</p>
															<ul
																style="
																	margin-top: 0px;
																	margin-bottom: 0px;
																	padding-inline-start: 48px;
																">
																<li
																	dir="ltr"
																	style="
																		list-style-type: disc;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	<p
																		dir="ltr"
																		style="
																			line-height: 1.872;
																			background-color: rgb(255, 255, 255);
																			margin-top: 0pt;
																			margin-bottom: 0pt;
																		"
																		role="presentation">
																		<span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>ID: 404 092 4271</span
																		>
																	</p>
																</li>
																<li
																	dir="ltr"
																	style="
																		list-style-type: disc;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	<p
																		dir="ltr"
																		style="
																			line-height: 1.872;
																			background-color: rgb(255, 255, 255);
																			margin-top: 0pt;
																			margin-bottom: 0pt;
																		"
																		role="presentation">
																		<span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>Password: g6azej</span
																		>
																	</p>
																</li>
																<li
																	dir="ltr"
																	style="
																		list-style-type: disc;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	<p
																		dir="ltr"
																		style="
																			line-height: 1.872;
																			background-color: rgb(255, 255, 255);
																			margin-top: 0pt;
																			margin-bottom: 10pt;
																		"
																		role="presentation">
																		<span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>Link: https://us02web.zoom.us/j/4040924271?pwd=cnhpZ0hNaThOL2JaYld0Unc3Zkxsdz09</span
																		>
																	</p>
																</li>
															</ul>
															<p
																dir="ltr"
																style="
																	line-height: 1.872;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																">
																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>Bên cạnh đó GDSC HCMUT chúng mình vẫn còn có
																	những sự kiện, trò chơi cho vòng chung
																	kết:</span
																>
															</p>
															<ul
																style="
																	margin-top: 0px;
																	margin-bottom: 0px;
																	padding-inline-start: 48px;
																">
																<li
																	dir="ltr"
																	style="
																		list-style-type: disc;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	<p
																		dir="ltr"
																		style="
																			line-height: 1.872;
																			background-color: rgb(255, 255, 255);
																			margin-top: 0pt;
																			margin-bottom: 0pt;
																		"
																		role="presentation">
																		<span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>Ngày 25/06: </span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>GIC Idea Showcase</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			">
																		</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>(Offline 08:00 - 12:30 Nhà văn hóa sinh
																			viên Đại học Quốc gia)</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>. 6 đội được bình chọn sẽ trình bày ý
																			tưởng. Khán giả và giám khảo sẽ
																			bình chọn cho đội thắng cuộc. Các bạn vẫn
																			có thể đăng kí trực tiếp </span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			><a href="https://${
                                                                                IS_PRODUCTION
                                                                                    ? ''
                                                                                    : 'dev.'
                                                                            }gdsc.app/registry">tại đây</a></span
																		>
																	</p>
																</li>
																<li
																	dir="ltr"
																	style="
																		list-style-type: disc;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	<p
																		dir="ltr"
																		style="
																			line-height: 1.872;
																			background-color: rgb(255, 255, 255);
																			margin-top: 0pt;
																			margin-bottom: 10pt;
																		"
																		role="presentation">
																		<span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			><a href="https://${
                                                                                IS_PRODUCTION
                                                                                    ? ''
                                                                                    : 'dev.'
                                                                            }gdsc.app/campaign"> GIC Journey</a></span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>: Một chuỗi các nhiệm vụ thú vị sẽ được mở trong thời gian
                                                                            diễn ra sự kiện. Khi hoàn thành các thử thách, các bạn sẽ nhận được các
                                                                            mảnh ghép hoặc GCoins để tham gia quay trúng thưởng các mảnh này.
                                                                            Thu thập được đủ số mảnh theo yêu cầu, người chơi sẽ được đổi các </span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>phần quà giới hạn </span
                                                                        ><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			> đến từ GDSC HCMUT.</span
																		>
																	</p>
																</li>
															</ul>
															<p
																dir="ltr"
																style="
																	line-height: 1.872;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																	padding: 0pt 0pt 10pt;
																">
																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>GDSC - HCMUT rất vui khi có sự tham gia của
																	bạn, sự hiện diện và đóng góp của bạn sẽ là sự
																	thành công của sự kiện</span
																>
															</p>
															<p
																dir="ltr"
																style="
																	line-height: 1.872;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																	padding: 0pt 0pt 10pt;
																">
																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>Hẹn gặp bạn ở các sự kiện sắp tới.</span
																>
															</p>
															<p
																dir="ltr"
																style="
																	line-height: 1.656;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																">
																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>Cảm ơn./.</span
																>
															</p>
															<span
																id="m_-5174430959820603938m_8590484024401273439gmail-docs-internal-guid-0ee68f09-7fff-5ec6-0994-89a7bbb6040e"
																><p
																	dir="ltr"
																	style="
																		line-height: 1.38;
																		text-align: justify;
																		margin-top: 10pt;
																		margin-bottom: 0pt;
																	">
																	<span
																		style="
																			font-family: Arial;
																			background-color: transparent;
																			font-weight: 700;
																			font-variant-numeric: normal;
																			font-variant-east-asian: normal;
																			font-variant-alternates: normal;
																		"
																		><font color="#000000">--</font></span
																	>
																</p>
																<p
																	dir="ltr"
																	style="
																		line-height: 1.38;
																		text-align: justify;
																		margin-top: 10pt;
																		margin-bottom: 0pt;
																	">
																	<span
																		style="
																			font-size: 13pt;
																			font-family: Arial;
																			color: rgb(66, 133, 244);
																			background-color: transparent;
																			font-weight: 700;
																			font-variant-numeric: normal;
																			font-variant-east-asian: normal;
																			font-variant-alternates: normal;
																		"
																		>Google Developer Student Club - HCMUT</span
																	><span
																		style="
																			font-size: 13pt;
																			font-family: Arial;
																			color: rgb(66, 133, 244);
																			background-color: transparent;
																			font-weight: 700;
																			font-variant-numeric: normal;
																			font-variant-east-asian: normal;
																			font-variant-alternates: normal;
																		"
																		><br /></span
																	><span
																		style="
																			font-size: 11pt;
																			font-family: Arial;
																			color: rgb(85, 85, 85);
																			background-color: transparent;
																			font-variant-numeric: normal;
																			font-variant-east-asian: normal;
																			font-variant-alternates: normal;
																		"
																		>GDSC Idea Contest</span
																	>
																</p>
																<p
																	dir="ltr"
																	style="
																		line-height: 1.38;
																		text-align: justify;
																		margin-top: 0pt;
																		margin-bottom: 0pt;
																		padding: 10pt 0pt 0pt;
																	">
																	<span
																		style="
																			font-size: 10pt;
																			font-family: Arial;
																			color: rgb(85, 85, 85);
																			background-color: transparent;
																			font-weight: 700;
																			font-style: italic;
																			font-variant-numeric: normal;
																			font-variant-east-asian: normal;
																			font-variant-alternates: normal;
																		"
																		>Email: </span
																	><a
																		href="mailto:contact@gdschcmut.dev"
																		style="text-decoration-line: none"
																		target="_blank"
																		><span
																			style="
																				font-size: 10pt;
																				font-family: Arial;
																				background-color: transparent;
																				font-style: italic;
																				font-variant-numeric: normal;
																				font-variant-east-asian: normal;
																				font-variant-alternates: normal;
																				text-decoration-line: underline;
																			"
																			>contact@gdschcmut.dev</span
																		><span
																			style="
																				font-size: 10pt;
																				font-family: Arial;
																				color: rgb(66, 133, 244);
																				background-color: transparent;
																				font-style: italic;
																				font-variant-numeric: normal;
																				font-variant-east-asian: normal;
																				font-variant-alternates: normal;
																			"
																			><br /></span></a
																	><span
																		style="
																			font-size: 10pt;
																			font-family: Arial;
																			color: rgb(85, 85, 85);
																			background-color: transparent;
																			font-weight: 700;
																			font-style: italic;
																			font-variant-numeric: normal;
																			font-variant-east-asian: normal;
																			font-variant-alternates: normal;
																		"
																		>Facebook:</span
																	><a
																		href="https://www.facebook.com/dscxhcmut/"
																		style="text-decoration-line: none"
																		target="_blank"
																		data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/dscxhcmut/&amp;source=gmail&amp;ust=1684859221061000&amp;usg=AOvVaw0xUt1dK6QXnipIuHMs_AoL"
																		><span
																			style="
																				font-size: 10pt;
																				font-family: Arial;
																				background-color: transparent;
																				font-weight: 700;
																				font-style: italic;
																				font-variant-numeric: normal;
																				font-variant-east-asian: normal;
																				font-variant-alternates: normal;
																				text-decoration-line: underline;
																			">
																		</span
																		><span
																			style="
																				font-size: 10pt;
																				font-family: Arial;
																				background-color: transparent;
																				font-style: italic;
																				font-variant-numeric: normal;
																				font-variant-east-asian: normal;
																				font-variant-alternates: normal;
																				text-decoration-line: underline;
																			"
																			>https://www.facebook.com/<wbr />dscxhcmut/</span
																		><span
																			style="
																				font-size: 10pt;
																				font-family: Arial;
																				color: rgb(85, 85, 85);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: italic;
																				font-variant-numeric: normal;
																				font-variant-east-asian: normal;
																				font-variant-alternates: normal;
																			"
																			><br /></span></a
																	><span
																		style="
																			font-size: 10pt;
																			font-family: Arial;
																			color: rgb(85, 85, 85);
																			background-color: transparent;
																			font-weight: 700;
																			font-style: italic;
																			font-variant-numeric: normal;
																			font-variant-east-asian: normal;
																			font-variant-alternates: normal;
																		"
																		>Address:</span
																	><span
																		style="
																			font-size: 10pt;
																			font-family: Arial;
																			color: rgb(85, 85, 85);
																			background-color: transparent;
																			font-style: italic;
																			font-variant-numeric: normal;
																			font-variant-east-asian: normal;
																			font-variant-alternates: normal;
																		">
																		268 Ly Thuong Kiet, Ward 14, District 10, Ho
																		Chi Minh City</span
																	>
																</p></span
															></span
														>
														<table
															cellspacing="0"
															cellpadding="0"
															border="0"
															width="100%">
															<tbody></tbody>
														</table>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>

								<tr>
									<td>
										<table
											cellspacing="0"
											cellpadding="0"
											border="0"
											width="100%">
											<tbody>
												<tr>
													<td
														style="
															background-color: #ffffff;
															border-top: 1px solid #f6f7f9;
															padding: 40px 0 40px;
															font-size: 13px;
															color: #7e8890;
														"
														align="center">
														<a
															href="https://streaklinks.com/BT8hHi6ERIjsu_ZJEAk4wpeN/https%3A%2F%2Fu16161593.ct.sendgrid.net%2Fls%2Fclick%3Fupn%3D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0Lwzg9C4VAJP20noOG84jTS0macmi_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utclyf2jsJXHRWfDwAkctFUwX73MYpmhWoeW8oW3o4G-2BckDWo-2B-2BpTWXVDLrSObETzmtUBODjGL1bz38mFGTyffJb25DGpaEGIiPTR7dq560VdIXaKAEBLq9sVl1-2B-2BRDKL4D0J2OAJTTFSYIs07rHvbIHw-3D-3D"
															target="_blank"
															data-saferedirecturl="https://www.google.com/url?q=https://streaklinks.com/BT8hHi6ERIjsu_ZJEAk4wpeN/https%253A%252F%252Fu16161593.ct.sendgrid.net%252Fls%252Fclick%253Fupn%253D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0Lwzg9C4VAJP20noOG84jTS0macmi_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utclyf2jsJXHRWfDwAkctFUwX73MYpmhWoeW8oW3o4G-2BckDWo-2B-2BpTWXVDLrSObETzmtUBODjGL1bz38mFGTyffJb25DGpaEGIiPTR7dq560VdIXaKAEBLq9sVl1-2B-2BRDKL4D0J2OAJTTFSYIs07rHvbIHw-3D-3D&amp;source=gmail&amp;ust=1684859221061000&amp;usg=AOvVaw0IUWachcinSYOeJ36YJ2tp"
															><img
																border="0"
																src="https://ci3.googleusercontent.com/proxy/1r-2vzVLcsXOpbFMuS1z_1wAHilkgE7VFmSK2du-iSEE9y_IDtifkp_7W6Tl0I8cWPm-LpQkJJjwV-MWuUOCR9f8ODWCK6t1yzb40sb10EICj67F2A3ZaCIPBmtk9CdzZCBQ65LpsCExriQv8CzuM_4vxPC8UCV_Q6zlmJ5gj3hTZ7ObfIF2nkBXNKBsxB_o8mlvE0HvKyviDRH3jOdMhZUE6f84W3J0mPP3uMuxWfT3vmV9IRKqPAQoC5WlegZTQnruwsQq3A=s0-d-e1-ft#https://res.cloudinary.com/startup-grind/image/upload/c_fit,dpr_2.0,f_auto,g_center,h_60,q_auto:good,w_500/v1/gcs/platform-data-dsc/contentbuilder/logo_dark_horizontal_WVttpzD.png"
																height="30"
														/></a>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
			</tbody>
		</table>

		<img
			style="
				height: 1px !important;
				width: 1px !important;
				border-width: 0 !important;
				margin-top: 0 !important;
				margin-bottom: 0 !important;
				margin-right: 0 !important;
				margin-left: 0 !important;
				padding-top: 0 !important;
				padding-bottom: 0 !important;
				padding-right: 0 !important;
				padding-left: 0 !important;
			"
			border="0"
			height="1"
			width="1"
			alt=""
			src="https://ci5.googleusercontent.com/proxy/TM6Pu1jLMfEZO_Tw9fwBSCQg-_Pi4GoWDRH35_cS3oyS5zEJY192JqakvAo1DhL-as5PJ4a6vXaGyc_RBmzAEefu_kEfQ-XVEkQdQyj7H1VrlFa69UU1OjU3_Nq59DjkomUOP8_HQ97JUvlJbMESxO44jsyhXKtDA5jqHp8nRcpNnT1B131kO5lyHPulNQAstGE4pzXGdMBFepwi7Ad_axpSVr6y0jKa1xQzBHoVFIAnSsT0hMIpgUdty2J68SHBvBw9vjZHvbqMNTIaVYPTEHITn5lzsWxlDmXnw3eRc7VG14OFYq_Yijz686eSRqmntwBjI-247ST5KR8mD3v1d0xvJEWIgzCDz3ulJCHPYJaYu3TTRcKeyak4C856HHnEaC3RSa0iRt0UgUUz7zGVufO6bzg8yMqiS5I=s0-d-e1-ft#https://u16161593.ct.sendgrid.net/wf/open?upn=f9BVIBTE4MV61d5WjyC1xRBeR2D0-2FN201XFXTlyGhGyQgyHSETzPOsJgbL-2B6iWKcS5VFV0WSwLBEXJd1jcrJJuKwQm68GVMxsvpPG6KQ1MJzOJFj03Z-2FRqTFChIYweOcYW9QeGejF3u-2F9B11dZqzfjxleppWee-2FQ7IDcefEpxjuVE12hEsfPoZJNwF1utRzsCPvDW4FPYrxy3On5PFdlWE7kzdkn5ZSFwW1Pu2CyJj4-3D" />
	</div>
	<br />
</div>
    `;
}

export function DAY_5_REGISTRATION_SUCCESSFUL_EMAIL(
    receiver: string,
    encodedRegistrationId: string,
) {
    return `
    <div dir="ltr">
	<div
		style="
			background-color: #f6f7f9;
			margin: 0;
			padding: 0;
			font-family: 'Open Sans', Arial, sans-serif !important;
			font-weight: 400;
			color: #202124;
		">
		<div></div>
		<table cellpadding="15" cellspacing="0" border="0" width="100%">
			<tbody>
				<tr>
					<td style="background-color: #f6f7f9" align="center" width="100%">
						<table
							style="
								border-bottom-left-radius: 4px;
								border-bottom-right-radius: 4px;
								overflow: hidden;
								min-width: 290px;
								max-width: 600px;
							"
							cellspacing="0"
							cellpadding="0"
							border="0">
							<tbody>
								<tr>
									<td>
										<table
											cellspacing="0"
											cellpadding="0"
											border="0"
											width="100%">
											<tbody>
												<tr>
													<td
														style="
															padding: 0 0 15px;
															font-family: 'Open Sans', Arial, sans-serif !important;
														"
														valign="middle">
														<a
															style="
																font-size: 12px;
																color: #6f6f6f !important;
																padding: 1px 0;
																text-decoration: none !important;
															"
															href="https://streaklinks.com/BT8hHi6i4sz87Zu_jgWlHBim/https%3A%2F%2Fu16161593.ct.sendgrid.net%2Fls%2Fclick%3Fupn%3D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0LwznXXv5-2BoPgUHFt4ZMWenhtzqm7TjwMiA-2FFAAcTgMmUzqjVEhGztoc3RXmIWr31f9U-3DI0CU_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utc0IXBPSuXDsulPt-2BMuYAqYyOAd83zZixxdWawNN-2BT-2BiEAS7-2Bs49aOD3vNf7i12oczTvTKAg7vnxumi6yz7-2BrLhBQeoo95o72ChUsisLrcxpHCbTdj3-2Fpf0KoNR-2B9tXM6uj3lrwEddbE5MTql81MA0wQ-3D-3D"
															target="_blank"
															data-saferedirecturl="https://www.google.com/url?q=https://streaklinks.com/BT8hHi6i4sz87Zu_jgWlHBim/https%253A%252F%252Fu16161593.ct.sendgrid.net%252Fls%252Fclick%253Fupn%253D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0LwznXXv5-2BoPgUHFt4ZMWenhtzqm7TjwMiA-2FFAAcTgMmUzqjVEhGztoc3RXmIWr31f9U-3DI0CU_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utc0IXBPSuXDsulPt-2BMuYAqYyOAd83zZixxdWawNN-2BT-2BiEAS7-2Bs49aOD3vNf7i12oczTvTKAg7vnxumi6yz7-2BrLhBQeoo95o72ChUsisLrcxpHCbTdj3-2Fpf0KoNR-2B9tXM6uj3lrwEddbE5MTql81MA0wQ-3D-3D&amp;source=gmail&amp;ust=1684909879752000&amp;usg=AOvVaw2UUluje9Nfe3temLs2LC9I">
															Google Developer Student Clubs - VNU HCM -
															University of Technology
														</a>
													</td>

													<td
														style="
															padding: 0 0 15px;
															font-family: 'Open Sans', Arial, sans-serif !important;
														"
														valign="middle"
														align="right">
														<br />
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>

								<tr>
									<td
										style="
											width: 600px;
											height: 136px;
											vertical-align: middle;
											border-bottom: 0px solid #f6f7f9;
											background-image: url(https://ci3.googleusercontent.com/proxy/jTbSl0_Srn4p-vihHLXnamvPIRqeZxUV8BUKAc3K9e9SGOUfkrvcSD4lXc-hrT8Xy6TJTpGAoO1_1YQhcYJhuyEUTFyhmZKHILgw709SiBMN2jTydWgf-PLxJc7UJrg8BTjB7aVfi1k1LjsoJov1dIrrxeNjzDGWSWctWk0mu2U2Ob7UM1QWU8BrNTkvaA8PdcQqyhXjlHU-J7n3k5vcCTHI6QZno8Eei93sXQGLfNiw_9nWGxWmgA=s0-d-e1-ft#https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,h_135,q_auto:eco,w_600/v1/gcs/platform-data-dsc/contentbuilder/email_header.png);
											background-color: #fff;
											border-top-right-radius: 4px;
											border-top-left-radius: 4px;
											background-size: cover;
										">
										<table
											style="width: 100%"
											width="100%"
											cellspacing="20"
											cellpadding="0"
											border="0">
											<tbody>
												<tr>
													<td
														style="vertical-align: middle; text-align: center">
														<div style="display: inline-block">
															<a
																style="text-align: center; display: block"
																href="https://streaklinks.com/BT8hHi6PT1YYETjglwM_Hm9E/https%3A%2F%2Fu16161593.ct.sendgrid.net%2Fls%2Fclick%3Fupn%3D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0LwznXXv5-2BoPgUHFt4ZMWenhtzqm7TjwMiA-2FFAAcTgMmUzqjVEhGztoc3RXmIWr31f9U-3D1WWW_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utcOdQF6JS3ei-2Fi-2B544Dvf86oqppqJ8ierQQhGgjkxucq7fumdIZnstg-2BFUndpO-2FfxP4Ly3TP4GzCOy9ht90I8WESMt6kPH7KOOCcKJJqWM79bCah4CxTulb6AN7wK5cJ2S-2FdFuFhMq1xCBL1vObinRiQ-3D-3D"
																target="_blank"
																data-saferedirecturl="https://www.google.com/url?q=https://streaklinks.com/BT8hHi6PT1YYETjglwM_Hm9E/https%253A%252F%252Fu16161593.ct.sendgrid.net%252Fls%252Fclick%253Fupn%253D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0LwznXXv5-2BoPgUHFt4ZMWenhtzqm7TjwMiA-2FFAAcTgMmUzqjVEhGztoc3RXmIWr31f9U-3D1WWW_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utcOdQF6JS3ei-2Fi-2B544Dvf86oqppqJ8ierQQhGgjkxucq7fumdIZnstg-2BFUndpO-2FfxP4Ly3TP4GzCOy9ht90I8WESMt6kPH7KOOCcKJJqWM79bCah4CxTulb6AN7wK5cJ2S-2FdFuFhMq1xCBL1vObinRiQ-3D-3D&amp;source=gmail&amp;ust=1684909879752000&amp;usg=AOvVaw31igyJh6zL58G1hNeKh0Xn">
																<img
																	height="50"
																	border="0"
																	alt="Google Developer Student Clubs"
																	src="https://ci3.googleusercontent.com/proxy/wEsj66QGvdQacrMw4Qm3A1r-Gbyd3Uz7XY2HRkhxyXCxKpzCzuqi2KlBu70FVmRXCvpd7HqgnKJFFW2ga4xiGnLgF1jjWDvQfTAgMBbC_onFujTrhFAl99zrDBLsS6moSRMG2EAHgFGRL2dLMbG-0GkgcVd3pOEeeTJzZzhI6CuspG6FeRi177hNC7sRe2INLGkoVoVMrgzZhPiZs4HnGot13yae4p1VnyKpydIqCwul8OV7wDdlCBT8EQ9K6HTlNVMM49A=s0-d-e1-ft#https://res.cloudinary.com/startup-grind/image/upload/c_fit,dpr_2.0,f_auto,g_center,h_100,q_auto:good,w_500/v1/gcs/platform-data-dsc/contentbuilder/logo_dark_stacked_ziDh4mP.png" />
															</a>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>

								<tr>
									<td style="padding-top: 1px">
										<table
											cellspacing="0"
											cellpadding="0"
											border="0"
											width="100%">
											<tbody>
												<tr>
													<td
														style="
															background-color: #fff;
															padding: 25px 35px;
															text-align: left;
															font-family: 'Open Sans', Arial, sans-serif !important;
															font-size: 14px;
															line-height: 20px;
														"
														align="center"
														valign="top">
														<span
															id="m_4752688072872031428m_-5174430959820603938m_8590484024401273439m_-7246610426249120709gmail-docs-internal-guid-1795923a-7fff-3ee5-47f8-07a4555c096e"
															><p
																dir="ltr"
																style="
																	line-height: 1.656;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																	padding: 0pt 0pt 10pt;
																">
																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>Xin chào </span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>${receiver}</span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>,</span
																>
															</p>
															<p
																dir="ltr"
																style="
																	line-height: 1.872;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																	padding: 0pt 0pt 10pt;
																">
																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>Chúc mừng </span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>${receiver}</span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	đã đăng ký thành công và trở thành một phần
																	của của sự kiện buổi chung kết </span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>GIC Idea Showcase </span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>trong chuỗi </span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>GDSC Idea Contest: THiNK 2023</span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>. Đây sẽ là mã QR dùng để check in tại sự
																	kiện cũng như là để bình chọn cho các đội tham
																	gia buổi chung kết.</span
																>
															</p>
															<div
																style="
                                                                    text-align: center;
																	justify-content: center;
																	margin-bottom: 10pt;
																">
																<img
																	src="https://dev.api.fessior.com/gic/qr?content=${encodedRegistrationId}"
																	style="width: 40%" />
															</div>
															<p
																dir="ltr"
																style="
																	line-height: 1.872;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																">
																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>GIC Idea Showcase</span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	giờ đây sẽ thêm thú vị hơn bởi có sự xuất hiện
																	bạn. Đừng quên những thông tin của ngày đặc
																	biệt này nhé:</span
																>
															</p>
															<ul
																style="
																	margin-top: 0px;
																	margin-bottom: 0px;
																	padding-inline-start: 48px;
																">
																<li
																	dir="ltr"
																	style="
																		list-style-type: disc;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	<p
																		dir="ltr"
																		style="
																			line-height: 1.872;
																			background-color: rgb(255, 255, 255);
																			margin-top: 0pt;
																			margin-bottom: 0pt;
																		"
																		role="presentation">
																		<span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>Ngày 25/06: </span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>GIC Idea Showcase</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			">
																		</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>(Offline 08:00 - 12:30 Nhà văn hóa sinh
																			viên Đại học Quốc gia)</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>. 6 đội được bình chọn đó sẽ trình bày ý
																			tưởng sau đó các khán giả và giám khảo sẽ
																			bình chọn cho đội thắng cuộc.</span
																		>
																	</p>
																</li>
																<li
																	dir="ltr"
																	style="
																		list-style-type: disc;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	<p
																		dir="ltr"
																		style="
																			line-height: 1.872;
																			background-color: rgb(255, 255, 255);
																			margin-top: 0pt;
																			margin-bottom: 10pt;
																		"
																		role="presentation">
																		<span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>Khi tham dự ngày GIC Idea Showcase, các
																			diễn giả, chuyên gia và ban giám khảo sẽ
																			trả lời các câu hỏi về công nghệ, cơ hội
																			việc làm sẽ được giải đáp. Bên cạnh&nbsp;
																			đó là những đội thi, những ý tưởng sẽ được
																			trình bày và cách ban giám khảo chọn ra
																			đội thắng cuộc sẽ là một điều bất ngờ
																			đấy!</span
																		>
																	</p>
																</li>
															</ul>
															<p
																dir="ltr"
																style="
																	line-height: 1.872;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																	padding: 0pt 0pt 10pt;
																">
																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>Ngoài sự kiện ra, chúng mình còn có những trò
																	chơi để các bạn có thể tương tác với câu lạc
																	bộ GDSC HCMUT chúng mình tại </span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	><a href="https://${
                                                                        IS_PRODUCTION
                                                                            ? ''
                                                                            : 'dev.'
                                                                    }gdsc.app/campaign/"> GIC Journey</a></span
																><span
                                                                    style="
                                                                        font-size: 12pt;
                                                                        font-family: Arial;
                                                                        color: rgb(0, 0, 0);
                                                                        background-color: transparent;
                                                                        font-weight: 400;
                                                                        font-style: normal;
                                                                        font-variant: normal;
                                                                        text-decoration: none;
                                                                    "
                                                                    >. Một chuỗi các nhiệm vụ thú vị sẽ được mở trong thời gian
                                                                    diễn ra sự kiện. Khi hoàn thành các thử thách, các bạn sẽ nhận được các
                                                                    mảnh ghép hoặc GCoins để tham gia quay trúng thưởng các mảnh này.
                                                                    Thu thập được đủ số mảnh theo yêu cầu, người chơi sẽ được đổi các </span
                                                                ><span
                                                                    style="
                                                                        font-size: 12pt;
                                                                        font-family: Arial;
                                                                        color: rgb(0, 0, 0);
                                                                        background-color: transparent;
                                                                        font-weight: 700;
                                                                        font-style: normal;
                                                                        font-variant: normal;
                                                                        text-decoration: none;
                                                                    "
                                                                    >phần quà giới hạn </span
                                                                ><span
                                                                    style="
                                                                        font-size: 12pt;
                                                                        font-family: Arial;
                                                                        color: rgb(0, 0, 0);
                                                                        background-color: transparent;
                                                                        font-weight: 400;
                                                                        font-style: normal;
                                                                        font-variant: normal;
                                                                        text-decoration: none;
                                                                    "
                                                                    > đến từ GDSC HCMUT.</span
                                                                >
															</p>
															<p
																dir="ltr"
																style="
																	line-height: 1.872;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																	padding: 0pt 0pt 10pt;
																">
																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>GDSC - HCMUT rất vui khi có sự tham gia của
																	bạn, sự hiện diện và đóng góp của bạn&nbsp; sẽ
																	là sự thành công của sự kiện</span
																>
															</p>
															<p
																dir="ltr"
																style="
																	line-height: 1.872;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																	padding: 0pt 0pt 10pt;
																">
																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>Hẹn gặp bạn ở sự kiện sắp tới.</span
																>
															</p>
															<p
																dir="ltr"
																style="
																	line-height: 1.656;
																	background-color: rgb(255, 255, 255);
																	margin-top: 0pt;
																	margin-bottom: 0pt;
																">
																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>Cảm ơn./.</span
																>
															</p>
															<span
																id="m_4752688072872031428m_-5174430959820603938m_8590484024401273439gmail-docs-internal-guid-0ee68f09-7fff-5ec6-0994-89a7bbb6040e"
																><p
																	dir="ltr"
																	style="
																		line-height: 1.38;
																		text-align: justify;
																		margin-top: 10pt;
																		margin-bottom: 0pt;
																	">
																	<span
																		style="
																			font-family: Arial;
																			background-color: transparent;
																			font-weight: 700;
																			font-variant-numeric: normal;
																			font-variant-east-asian: normal;
																			font-variant-alternates: normal;
																			vertical-align: baseline;
																			white-space: pre-wrap;
																		"
																		><font color="#000000">--</font></span
																	>
																</p>
																<p
																	dir="ltr"
																	style="
																		line-height: 1.38;
																		text-align: justify;
																		margin-top: 10pt;
																		margin-bottom: 0pt;
																	">
																	<span
																		style="
																			font-size: 13pt;
																			font-family: Arial;
																			color: rgb(66, 133, 244);
																			background-color: transparent;
																			font-weight: 700;
																			font-variant-numeric: normal;
																			font-variant-east-asian: normal;
																			font-variant-alternates: normal;
																			vertical-align: baseline;
																			white-space: pre-wrap;
																		"
																		>Google Developer Student Club - HCMUT</span
																	><span
																		style="
																			font-size: 13pt;
																			font-family: Arial;
																			color: rgb(66, 133, 244);
																			background-color: transparent;
																			font-weight: 700;
																			font-variant-numeric: normal;
																			font-variant-east-asian: normal;
																			font-variant-alternates: normal;
																			vertical-align: baseline;
																			white-space: pre-wrap;
																		"
																		><br /></span
																	><span
																		style="
																			font-size: 11pt;
																			font-family: Arial;
																			color: rgb(85, 85, 85);
																			background-color: transparent;
																			font-variant-numeric: normal;
																			font-variant-east-asian: normal;
																			font-variant-alternates: normal;
																			vertical-align: baseline;
																			white-space: pre-wrap;
																		"
																		>GDSC Idea Contest</span
																	>
																</p>
																<p
																	dir="ltr"
																	style="
																		line-height: 1.38;
																		text-align: justify;
																		margin-top: 0pt;
																		margin-bottom: 0pt;
																		padding: 10pt 0pt 0pt;
																	">
																	<span
																		style="
																			font-size: 10pt;
																			font-family: Arial;
																			color: rgb(85, 85, 85);
																			background-color: transparent;
																			font-weight: 700;
																			font-style: italic;
																			font-variant-numeric: normal;
																			font-variant-east-asian: normal;
																			font-variant-alternates: normal;
																			vertical-align: baseline;
																			white-space: pre-wrap;
																		"
																		>Email: </span
																	><a
																		href="mailto:contact@gdschcmut.dev"
																		style="text-decoration-line: none"
																		target="_blank"
																		><span
																			style="
																				font-size: 10pt;
																				font-family: Arial;
																				background-color: transparent;
																				font-style: italic;
																				font-variant-numeric: normal;
																				font-variant-east-asian: normal;
																				font-variant-alternates: normal;
																				text-decoration-line: underline;
																			"
																			>contact@gdschcmut.dev</span
																		><span
																			style="
																				font-size: 10pt;
																				font-family: Arial;
																				color: rgb(66, 133, 244);
																				background-color: transparent;
																				font-style: italic;
																				font-variant-numeric: normal;
																				font-variant-east-asian: normal;
																				font-variant-alternates: normal;
																			"
																			><br /></span></a
																	><span
																		style="
																			font-size: 10pt;
																			font-family: Arial;
																			color: rgb(85, 85, 85);
																			background-color: transparent;
																			font-weight: 700;
																			font-style: italic;
																			font-variant-numeric: normal;
																			font-variant-east-asian: normal;
																			font-variant-alternates: normal;
																			vertical-align: baseline;
																			white-space: pre-wrap;
																		"
																		>Facebook:</span
																	><a
																		href="https://www.facebook.com/dscxhcmut/"
																		style="text-decoration-line: none"
																		target="_blank"
																		data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/dscxhcmut/&amp;source=gmail&amp;ust=1684909879753000&amp;usg=AOvVaw2lljddD7uB4uZA-uEjLICl"
																		><span
																			style="
																				font-size: 10pt;
																				font-family: Arial;
																				background-color: transparent;
																				font-weight: 700;
																				font-style: italic;
																				font-variant-numeric: normal;
																				font-variant-east-asian: normal;
																				font-variant-alternates: normal;
																				text-decoration-line: underline;
																			">
																		</span
																		><span
																			style="
																				font-size: 10pt;
																				font-family: Arial;
																				background-color: transparent;
																				font-style: italic;
																				font-variant-numeric: normal;
																				font-variant-east-asian: normal;
																				font-variant-alternates: normal;
																				text-decoration-line: underline;
																			"
																			>https://www.facebook.com/<wbr />dscxhcmut/</span
																		><span
																			style="
																				font-size: 10pt;
																				font-family: Arial;
																				color: rgb(85, 85, 85);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: italic;
																				font-variant-numeric: normal;
																				font-variant-east-asian: normal;
																				font-variant-alternates: normal;
																			"
																			><br /></span></a
																	><span
																		style="
																			font-size: 10pt;
																			font-family: Arial;
																			color: rgb(85, 85, 85);
																			background-color: transparent;
																			font-weight: 700;
																			font-style: italic;
																			font-variant-numeric: normal;
																			font-variant-east-asian: normal;
																			font-variant-alternates: normal;
																			vertical-align: baseline;
																			white-space: pre-wrap;
																		"
																		>Address:</span
																	><span
																		style="
																			font-size: 10pt;
																			font-family: Arial;
																			color: rgb(85, 85, 85);
																			background-color: transparent;
																			font-style: italic;
																			font-variant-numeric: normal;
																			font-variant-east-asian: normal;
																			font-variant-alternates: normal;
																			vertical-align: baseline;
																			white-space: pre-wrap;
																		">
																		268 Ly Thuong Kiet, Ward 14, District 10, Ho
																		Chi Minh City</span
																	>
																</p></span
															></span
														>
														<table
															cellspacing="0"
															cellpadding="0"
															border="0"
															width="100%">
															<tbody></tbody>
														</table>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>

								<tr>
									<td>
										<table
											cellspacing="0"
											cellpadding="0"
											border="0"
											width="100%">
											<tbody>
												<tr>
													<td
														style="
															background-color: #ffffff;
															border-top: 1px solid #f6f7f9;
															padding: 40px 0 40px;
															font-size: 13px;
															color: #7e8890;
														"
														align="center">
														<a
															href="https://streaklinks.com/BT8hHi6ERIjsu_ZJEAk4wpeN/https%3A%2F%2Fu16161593.ct.sendgrid.net%2Fls%2Fclick%3Fupn%3D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0Lwzg9C4VAJP20noOG84jTS0macmi_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utclyf2jsJXHRWfDwAkctFUwX73MYpmhWoeW8oW3o4G-2BckDWo-2B-2BpTWXVDLrSObETzmtUBODjGL1bz38mFGTyffJb25DGpaEGIiPTR7dq560VdIXaKAEBLq9sVl1-2B-2BRDKL4D0J2OAJTTFSYIs07rHvbIHw-3D-3D"
															target="_blank"
															data-saferedirecturl="https://www.google.com/url?q=https://streaklinks.com/BT8hHi6ERIjsu_ZJEAk4wpeN/https%253A%252F%252Fu16161593.ct.sendgrid.net%252Fls%252Fclick%253Fupn%253D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0Lwzg9C4VAJP20noOG84jTS0macmi_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utclyf2jsJXHRWfDwAkctFUwX73MYpmhWoeW8oW3o4G-2BckDWo-2B-2BpTWXVDLrSObETzmtUBODjGL1bz38mFGTyffJb25DGpaEGIiPTR7dq560VdIXaKAEBLq9sVl1-2B-2BRDKL4D0J2OAJTTFSYIs07rHvbIHw-3D-3D&amp;source=gmail&amp;ust=1684909879753000&amp;usg=AOvVaw0C9sZuCWuk18S5FfVKYGHO"
															><img
																border="0"
																src="https://ci3.googleusercontent.com/proxy/1r-2vzVLcsXOpbFMuS1z_1wAHilkgE7VFmSK2du-iSEE9y_IDtifkp_7W6Tl0I8cWPm-LpQkJJjwV-MWuUOCR9f8ODWCK6t1yzb40sb10EICj67F2A3ZaCIPBmtk9CdzZCBQ65LpsCExriQv8CzuM_4vxPC8UCV_Q6zlmJ5gj3hTZ7ObfIF2nkBXNKBsxB_o8mlvE0HvKyviDRH3jOdMhZUE6f84W3J0mPP3uMuxWfT3vmV9IRKqPAQoC5WlegZTQnruwsQq3A=s0-d-e1-ft#https://res.cloudinary.com/startup-grind/image/upload/c_fit,dpr_2.0,f_auto,g_center,h_60,q_auto:good,w_500/v1/gcs/platform-data-dsc/contentbuilder/logo_dark_horizontal_WVttpzD.png"
																height="30"
														/></a>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
			</tbody>
		</table>

		<img
			style="
				height: 1px !important;
				width: 1px !important;
				border-width: 0 !important;
				margin-top: 0 !important;
				margin-bottom: 0 !important;
				margin-right: 0 !important;
				margin-left: 0 !important;
				padding-top: 0 !important;
				padding-bottom: 0 !important;
				padding-right: 0 !important;
				padding-left: 0 !important;
			"
			border="0"
			height="1"
			width="1"
			alt=""
			src="https://ci5.googleusercontent.com/proxy/TM6Pu1jLMfEZO_Tw9fwBSCQg-_Pi4GoWDRH35_cS3oyS5zEJY192JqakvAo1DhL-as5PJ4a6vXaGyc_RBmzAEefu_kEfQ-XVEkQdQyj7H1VrlFa69UU1OjU3_Nq59DjkomUOP8_HQ97JUvlJbMESxO44jsyhXKtDA5jqHp8nRcpNnT1B131kO5lyHPulNQAstGE4pzXGdMBFepwi7Ad_axpSVr6y0jKa1xQzBHoVFIAnSsT0hMIpgUdty2J68SHBvBw9vjZHvbqMNTIaVYPTEHITn5lzsWxlDmXnw3eRc7VG14OFYq_Yijz686eSRqmntwBjI-247ST5KR8mD3v1d0xvJEWIgzCDz3ulJCHPYJaYu3TTRcKeyak4C856HHnEaC3RSa0iRt0UgUUz7zGVufO6bzg8yMqiS5I=s0-d-e1-ft#https://u16161593.ct.sendgrid.net/wf/open?upn=f9BVIBTE4MV61d5WjyC1xRBeR2D0-2FN201XFXTlyGhGyQgyHSETzPOsJgbL-2B6iWKcS5VFV0WSwLBEXJd1jcrJJuKwQm68GVMxsvpPG6KQ1MJzOJFj03Z-2FRqTFChIYweOcYW9QeGejF3u-2F9B11dZqzfjxleppWee-2FQ7IDcefEpxjuVE12hEsfPoZJNwF1utRzsCPvDW4FPYrxy3On5PFdlWE7kzdkn5ZSFwW1Pu2CyJj4-3D" />
	</div>
	<br />
</div>
    `;
}

export function SEMINAR_1_30_MINUTE_REMINDER_EMAIL(
    receiver: string
) {
    return `
    <div dir="ltr">
	<div
		style="
			background-color: #f6f7f9;
			margin: 0;
			padding: 0;
			font-family: 'Open Sans', Arial, sans-serif !important;
			font-weight: 400;
			color: #202124;
		">
		<table border="0" width="100%" cellspacing="0" cellpadding="15">
			<tbody>
				<tr>
					<td style="background-color: #f6f7f9" align="center" width="100%">
						<table
							style="
								border-bottom-left-radius: 4px;
								border-bottom-right-radius: 4px;
								overflow: hidden;
								min-width: 290px;
								max-width: 600px;
							"
							border="0"
							cellspacing="0"
							cellpadding="0">
							<tbody>
								<tr>
									<td>
										<table
											border="0"
											width="100%"
											cellspacing="0"
											cellpadding="0">
											<tbody>
												<tr>
													<td
														style="
															padding: 0 0 15px;
															font-family: 'Open Sans', Arial, sans-serif !important;
														"
														valign="middle">
														<a
															style="
																font-size: 12px;
																color: #6f6f6f !important;
																padding: 1px 0;
																text-decoration: none !important;
															"
															href="https://streaklinks.com/BT8hHi6i4sz87Zu_jgWlHBim/https%3A%2F%2Fu16161593.ct.sendgrid.net%2Fls%2Fclick%3Fupn%3D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0LwznXXv5-2BoPgUHFt4ZMWenhtzqm7TjwMiA-2FFAAcTgMmUzqjVEhGztoc3RXmIWr31f9U-3DI0CU_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utc0IXBPSuXDsulPt-2BMuYAqYyOAd83zZixxdWawNN-2BT-2BiEAS7-2Bs49aOD3vNf7i12oczTvTKAg7vnxumi6yz7-2BrLhBQeoo95o72ChUsisLrcxpHCbTdj3-2Fpf0KoNR-2B9tXM6uj3lrwEddbE5MTql81MA0wQ-3D-3D"
															target="_blank"
															data-saferedirecturl="https://www.google.com/url?q=https://streaklinks.com/BT8hHi6i4sz87Zu_jgWlHBim/https%253A%252F%252Fu16161593.ct.sendgrid.net%252Fls%252Fclick%253Fupn%253D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0LwznXXv5-2BoPgUHFt4ZMWenhtzqm7TjwMiA-2FFAAcTgMmUzqjVEhGztoc3RXmIWr31f9U-3DI0CU_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utc0IXBPSuXDsulPt-2BMuYAqYyOAd83zZixxdWawNN-2BT-2BiEAS7-2Bs49aOD3vNf7i12oczTvTKAg7vnxumi6yz7-2BrLhBQeoo95o72ChUsisLrcxpHCbTdj3-2Fpf0KoNR-2B9tXM6uj3lrwEddbE5MTql81MA0wQ-3D-3D&amp;source=gmail&amp;ust=1684859221061000&amp;usg=AOvVaw0ezGJtM5x-bu-b1w1OTady">
															Google Developer Student Clubs - VNU HCM -
															University of Technology
														</a>
													</td>
													<td
														style="
															padding: 0 0 15px;
															font-family: 'Open Sans', Arial, sans-serif !important;
														"
														align="right"
														valign="middle">
														&nbsp;
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
								<tr>
									<td
										style="
											width: 600px;
											height: 136px;
											vertical-align: middle;
											border-bottom: 0px solid #f6f7f9;
											background-image: url('https://ci3.googleusercontent.com/proxy/jTbSl0_Srn4p-vihHLXnamvPIRqeZxUV8BUKAc3K9e9SGOUfkrvcSD4lXc-hrT8Xy6TJTpGAoO1_1YQhcYJhuyEUTFyhmZKHILgw709SiBMN2jTydWgf-PLxJc7UJrg8BTjB7aVfi1k1LjsoJov1dIrrxeNjzDGWSWctWk0mu2U2Ob7UM1QWU8BrNTkvaA8PdcQqyhXjlHU-J7n3k5vcCTHI6QZno8Eei93sXQGLfNiw_9nWGxWmgA=s0-d-e1-ft#https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,h_135,q_auto:eco,w_600/v1/gcs/platform-data-dsc/contentbuilder/email_header.png');
											background-color: #fff;
											border-top-right-radius: 4px;
											border-top-left-radius: 4px;
											background-size: cover;
										">
										<table
											style="width: 100%"
											border="0"
											width="100%"
											cellspacing="20"
											cellpadding="0">
											<tbody>
												<tr>
													<td
														style="vertical-align: middle; text-align: center">
														<div style="display: inline-block">
															<a
																style="text-align: center; display: block"
																href="https://streaklinks.com/BT8hHi6PT1YYETjglwM_Hm9E/https%3A%2F%2Fu16161593.ct.sendgrid.net%2Fls%2Fclick%3Fupn%3D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0LwznXXv5-2BoPgUHFt4ZMWenhtzqm7TjwMiA-2FFAAcTgMmUzqjVEhGztoc3RXmIWr31f9U-3D1WWW_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utcOdQF6JS3ei-2Fi-2B544Dvf86oqppqJ8ierQQhGgjkxucq7fumdIZnstg-2BFUndpO-2FfxP4Ly3TP4GzCOy9ht90I8WESMt6kPH7KOOCcKJJqWM79bCah4CxTulb6AN7wK5cJ2S-2FdFuFhMq1xCBL1vObinRiQ-3D-3D"
																target="_blank"
																data-saferedirecturl="https://www.google.com/url?q=https://streaklinks.com/BT8hHi6PT1YYETjglwM_Hm9E/https%253A%252F%252Fu16161593.ct.sendgrid.net%252Fls%252Fclick%253Fupn%253D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0LwznXXv5-2BoPgUHFt4ZMWenhtzqm7TjwMiA-2FFAAcTgMmUzqjVEhGztoc3RXmIWr31f9U-3D1WWW_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utcOdQF6JS3ei-2Fi-2B544Dvf86oqppqJ8ierQQhGgjkxucq7fumdIZnstg-2BFUndpO-2FfxP4Ly3TP4GzCOy9ht90I8WESMt6kPH7KOOCcKJJqWM79bCah4CxTulb6AN7wK5cJ2S-2FdFuFhMq1xCBL1vObinRiQ-3D-3D&amp;source=gmail&amp;ust=1684859221061000&amp;usg=AOvVaw1a4Y44IdmJtY8kY9E4zhOL">
																<img
																	src="https://ci3.googleusercontent.com/proxy/wEsj66QGvdQacrMw4Qm3A1r-Gbyd3Uz7XY2HRkhxyXCxKpzCzuqi2KlBu70FVmRXCvpd7HqgnKJFFW2ga4xiGnLgF1jjWDvQfTAgMBbC_onFujTrhFAl99zrDBLsS6moSRMG2EAHgFGRL2dLMbG-0GkgcVd3pOEeeTJzZzhI6CuspG6FeRi177hNC7sRe2INLGkoVoVMrgzZhPiZs4HnGot13yae4p1VnyKpydIqCwul8OV7wDdlCBT8EQ9K6HTlNVMM49A=s0-d-e1-ft#https://res.cloudinary.com/startup-grind/image/upload/c_fit,dpr_2.0,f_auto,g_center,h_100,q_auto:good,w_500/v1/gcs/platform-data-dsc/contentbuilder/logo_dark_stacked_ziDh4mP.png"
																	alt="Google Developer Student Clubs"
																	height="50"
																	border="0" />
															</a>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
								<tr>
									<td style="padding-top: 1px">
										<table
											border="0"
											width="100%"
											cellspacing="0"
											cellpadding="0">
											<tbody>
												<tr style="height: 568.703px">
													<td
														style="
															background-color: #ffffff;
															padding: 25px 35px;
															text-align: left;
															font-size: 14px;
															line-height: 20px;
															font-family: 'Open Sans', Arial, sans-serif !important;
															height: 568.703px;
														"
														align="center"
														valign="top">
														<p
															dir="ltr"
															style="
																line-height: 1.656;
																background-color: #ffffff;
																margin-top: 0pt;
																margin-bottom: 0pt;
																padding: 0pt 0pt 10pt;
															">
															<span
																style="
																	font-size: 12pt;
																	font-family: Arial;
																	color: #000000;
																	background-color: transparent;
																	font-weight: 400;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																"
																>Xin chào
																<span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: #000000;
																		background-color: transparent;
																		font-weight: bold;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	>${receiver}<span
																		style="
																			font-size: 12pt;
																			font-family: Arial;
																			color: #000000;
																			background-color: transparent;
																			font-weight: 400;
																			font-style: normal;
																			font-variant: normal;
																			text-decoration: none;
																		"
																		>,
																	</span></span
																></span
															>
														</p>
														<p
															dir="ltr"
															style="
																line-height: 1.872;
																background-color: #ffffff;
																margin-top: 0pt;
																margin-bottom: 0pt;
																padding: 0pt 0pt 10pt;
																text-align: justify;
															">
															<span
																style="
																	font-size: 12pt;
																	font-family: Arial;
																	color: #000000;
																	background-color: transparent;
																	font-weight: 400;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																"
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: #000000;
																		background-color: transparent;
																		font-weight: bold;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	"
																	><span
																		style="
																			font-size: 12pt;
																			font-family: Arial;
																			color: #000000;
																			background-color: transparent;
																			font-weight: 400;
																			font-style: normal;
																			font-variant: normal;
																			text-decoration: none;
																		"
																		>GDSC HCMUT muốn nhắn nhủ rằng sự
																		kiện<strong>
																			"Seminar 1: Designing Your Idea</strong
																		>" thuộc chuỗi sự kiện
																		<strong
																			>GDSC Idea Contest 2023: THiNK</strong
																		>
																		sẽ diễn ra sau
																		<span style="color: #ff0000"
																			><strong>30 PHÚT</strong></span
																		>
																		nữa. Hãy chuẩn bị sẵn sàng để lắng nghe
																		những chia sẻ của speaker cũng như đặt câu
																		hỏi để chúng mình giải đáp những băn khoăn
																		của bạn nhé!</span
																	></span
																></span
															>
														</p>
														<p
															dir="ltr"
															style="
																line-height: 2.2464;
																background-color: rgb(255, 255, 255);
																margin-top: 0pt;
																margin-bottom: 10pt;
															">
															<span
																style="
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(0, 0, 0);
																	background-color: transparent;
																	font-weight: 700;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																"
																>Thông tin sự kiện:</span
															>
														</p>
														<p
															dir="ltr"
															style="
																line-height: 1.872;
																background-color: #ffffff;
																margin-top: 0pt;
																margin-bottom: 10pt;
															">
															<span
																id="gmail-docs-internal-guid-a34390ff-7fff-2948-3dcc-9062ecffe795"></span>
														</p>
														<ul
															style="
																margin-top: 0px;
																margin-bottom: 0px;
																padding-inline-start: 48px;
															">
															<li
																dir="ltr"
																style="
																	list-style-type: disc;
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(0, 0, 0);
																	background-color: transparent;
																	font-weight: 700;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																">
																<p
																	dir="ltr"
																	style="
																		line-height: 1.38;
																		margin-top: 11pt;
																		margin-bottom: 0pt;
																	"
																	role="presentation">
																	<span
																		style="
																			font-size: 12pt;
																			font-family: Arial;
																			color: rgb(0, 0, 0);
																			background-color: transparent;
																			font-weight: 700;
																			font-style: normal;
																			font-variant: normal;
																			text-decoration: none;
																		"
																		>Thời gian: 18:30 - 21:15 ngày
																		14/06/2023.</span
																	>
																</p>
															</li>
															<li
																dir="ltr"
																style="
																	list-style-type: disc;
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(0, 0, 0);
																	background-color: transparent;
																	font-weight: 400;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																">
																<p
																	dir="ltr"
																	style="
																		line-height: 1.38;
																		margin-top: 0pt;
																		margin-bottom: 0pt;
																	"
																	role="presentation">
																	<span
																		style="
																			font-size: 12pt;
																			font-family: Arial;
																			color: rgb(0, 0, 0);
																			background-color: transparent;
																			font-weight: 700;
																			font-style: normal;
																			font-variant: normal;
																			text-decoration: none;
																		"
																		>Nền tảng: </span
																	><span
																		style="
																			font-size: 12pt;
																			font-family: Arial;
																			color: rgb(0, 0, 0);
																			background-color: transparent;
																			font-weight: 400;
																			font-style: normal;
																			font-variant: normal;
																			text-decoration: none;
																		"
																		>Online qua nền tảng Zoom</span
																	><span
																		style="
																			font-size: 12pt;
																			font-family: Arial;
																			color: rgb(0, 0, 0);
																			background-color: transparent;
																			font-weight: 700;
																			font-style: normal;
																			font-variant: normal;
																			text-decoration: none;
																		">
																	</span
																	><a
																		href="https://us02web.zoom.us/j/4040924271?pwd=cnhpZ0hNaThOL2JaYld0Unc3Zkxsdz09"
																		style="text-decoration: none"
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(17, 85, 204);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: underline;
																				text-decoration-skip-ink: none;
																			"
																			>tại đây</span
																		></a
																	>
																</p>
															</li>
															<ul
																style="
																	margin-top: 0px;
																	margin-bottom: 0px;
																	padding-inline-start: 48px;
																">
																<li
																	dir="ltr"
																	style="
																		list-style-type: circle;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	<p
																		dir="ltr"
																		style="
																			line-height: 1.38;
																			margin-top: 0pt;
																			margin-bottom: 0pt;
																		"
																		role="presentation">
																		<span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>Meeting ID: 404 092 4271</span
																		>
																	</p>
																</li>
																<li
																	dir="ltr"
																	style="
																		list-style-type: circle;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	<p
																		dir="ltr"
																		style="
																			line-height: 1.38;
																			margin-top: 0pt;
																			margin-bottom: 11pt;
																		"
																		role="presentation">
																		<span
																			style="
																				background-color: transparent;
																				font-size: 12pt;
																				text-wrap: wrap;
																			"
																			>Passcode: g6azej</span
																		>
																	</p>
																</li>
															</ul>
														</ul>
														<ul
															style="
																font-family: 'Open Sans', Arial, sans-serif !important;
																font-size: 14px;
															"></ul>
														<p
															dir="ltr"
															style="
																line-height: 1.872;
																background-color: #ffffff;
																margin-top: 0pt;
																margin-bottom: 0pt;
																padding-top: 0pt;
																padding-right: 0pt;
																padding-bottom: 10pt;
															">
															<span
																style="
																	font-size: 12pt;
																	font-family: Arial;
																	color: #000000;
																	background-color: transparent;
																	font-weight: 400;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																"
																>Hẹn gặp bạn ở sự kiện.
															</span>
														</p>
														<p
															dir="ltr"
															style="
																line-height: 1.656;
																background-color: #ffffff;
																margin-top: 0pt;
																margin-bottom: 0pt;
															">
															<span
																style="
																	font-size: 12pt;
																	font-family: Arial;
																	color: #000000;
																	background-color: transparent;
																	font-weight: 400;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																"
																>Cảm ơn./.
															</span>
														</p>
														<p
															dir="ltr"
															style="
																line-height: 1.656;
																margin-top: 0pt;
																margin-bottom: 0pt;
															">
															<span
																style="
																	color: rgb(0, 0, 0);
																	font-family: 'Google Sans', sans-serif;
																	font-size: 12pt;
																	text-align: justify;
																"
																>–</span
															>
														</p>
														<p
															dir="ltr"
															style="
																line-height: 1.656;
																margin-top: 0pt;
																margin-bottom: 0pt;
															">
															<span
																style="
																	color: rgb(66, 133, 244);
																	font-family: 'Google Sans', sans-serif;
																	font-size: 13pt;
																	font-weight: 700;
																	text-align: justify;
																"
																>Google Developer Student Club</span
															>
														</p>
														<p
															dir="ltr"
															style="
																line-height: 1.656;
																margin-top: 0pt;
																margin-bottom: 0pt;
															">
															<span
																style="
																	color: rgb(85, 85, 85);
																	font-family: 'Google Sans', sans-serif;
																	font-size: 11pt;
																	text-align: justify;
																"
																>Ho Chi Minh City University of Technology</span
															>
														</p>
														<p
															dir="ltr"
															style="
																line-height: 1.656;
																margin-top: 0pt;
																margin-bottom: 0pt;
															">
															<span
																style="
																	text-align: justify;
																	font-variant-numeric: normal;
																	font-variant-east-asian: normal;
																	font-variant-alternates: normal;
																	font-size: 10pt;
																	font-family: 'Google Sans', sans-serif;
																	color: rgb(85, 85, 85);
																	font-weight: 700;
																	font-style: italic;
																	vertical-align: baseline;
																"
																>Email:</span
															><span
																style="
																	text-align: justify;
																	font-variant-numeric: normal;
																	font-variant-east-asian: normal;
																	font-variant-alternates: normal;
																	font-size: 10pt;
																	font-family: 'Google Sans', sans-serif;
																	color: rgb(85, 85, 85);
																	font-style: italic;
																	vertical-align: baseline;
																"
																>&nbsp;</span
															><span
																style="
																	text-align: justify;
																	font-variant-numeric: normal;
																	font-variant-east-asian: normal;
																	font-variant-alternates: normal;
																	font-size: 10pt;
																	font-family: 'Google Sans', sans-serif;
																	font-style: italic;
																	vertical-align: baseline;
																"
																><a
																	href="mailto:contact@gdschcmut.dev"
																	target="_blank"
																	style="color: rgb(17, 85, 204);"
																	>contact@gdschcmut.dev</a
																></span
															>
														</p>
														<p
															dir="ltr"
															style="
																line-height: 1.656;
																margin-top: 0pt;
																margin-bottom: 0pt;
															">
															<span
																style="
																	text-align: justify;
																	font-variant-numeric: normal;
																	font-variant-east-asian: normal;
																	font-variant-alternates: normal;
																	font-size: 10pt;
																	font-family: 'Google Sans', sans-serif;
																	color: rgb(85, 85, 85);
																	font-weight: 700;
																	font-style: italic;
																	vertical-align: baseline;
																"
																>Facebook:</span
															><a
																href="https://www.facebook.com/dscxhcmut/"
																hspace="streak-track"
																target="_blank"
																style="
																	text-align: justify;
																	text-decoration-line: none;
																"
																><span
																	style="
																		font-size: 10pt;
																		font-family: 'Google Sans', sans-serif;
																		font-weight: 700;
																		font-style: italic;
																		font-variant-numeric: normal;
																		font-variant-east-asian: normal;
																		font-variant-alternates: normal;
																		text-decoration-line: underline;
																		vertical-align: baseline;
																	"
																	>&nbsp;</span
																><span
																	style="
																		font-size: 10pt;
																		font-family: 'Google Sans', sans-serif;
																		font-style: italic;
																		font-variant-numeric: normal;
																		font-variant-east-asian: normal;
																		font-variant-alternates: normal;
																		text-decoration-line: underline;
																		vertical-align: baseline;
																		color: rgb(17, 85, 204);
																	"
																	>https://www.facebook.com/<wbr />dscxhcmut/</span
																></a
															>
														</p>
														<p
															dir="ltr"
															style="
																line-height: 1.656;
																margin-top: 0pt;
																margin-bottom: 0pt;
															">
															<span
																style="
																	text-align: justify;
																	font-variant-numeric: normal;
																	font-variant-east-asian: normal;
																	font-variant-alternates: normal;
																	font-size: 10pt;
																	font-family: 'Google Sans', sans-serif;
																	color: rgb(85, 85, 85);
																	font-weight: 700;
																	font-style: italic;
																	vertical-align: baseline;
																"
																>Address:</span
															><span
																style="
																	text-align: justify;
																	font-variant-numeric: normal;
																	font-variant-east-asian: normal;
																	font-variant-alternates: normal;
																	font-size: 10pt;
																	font-family: 'Google Sans', sans-serif;
																	color: rgb(85, 85, 85);
																	font-style: italic;
																	vertical-align: baseline;
																"
																>&nbsp;268 Ly Thuong Kiet, Ward 14, District 10,
																Ho Chi Minh City</span
															>
														</p>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
								<tr>
									<td>
										<table
											border="0"
											width="100%"
											cellspacing="0"
											cellpadding="0">
											<tbody>
												<tr>
													<td
														style="
															background-color: #ffffff;
															border-top: 1px solid #f6f7f9;
															padding: 40px 0 40px;
															font-size: 13px;
															color: #7e8890;
														"
														align="center">
														<a
															href="https://streaklinks.com/BT8hHi6ERIjsu_ZJEAk4wpeN/https%3A%2F%2Fu16161593.ct.sendgrid.net%2Fls%2Fclick%3Fupn%3D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0Lwzg9C4VAJP20noOG84jTS0macmi_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utclyf2jsJXHRWfDwAkctFUwX73MYpmhWoeW8oW3o4G-2BckDWo-2B-2BpTWXVDLrSObETzmtUBODjGL1bz38mFGTyffJb25DGpaEGIiPTR7dq560VdIXaKAEBLq9sVl1-2B-2BRDKL4D0J2OAJTTFSYIs07rHvbIHw-3D-3D"
															target="_blank"
															data-saferedirecturl="https://www.google.com/url?q=https://streaklinks.com/BT8hHi6ERIjsu_ZJEAk4wpeN/https%253A%252F%252Fu16161593.ct.sendgrid.net%252Fls%252Fclick%253Fupn%253D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0Lwzg9C4VAJP20noOG84jTS0macmi_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utclyf2jsJXHRWfDwAkctFUwX73MYpmhWoeW8oW3o4G-2BckDWo-2B-2BpTWXVDLrSObETzmtUBODjGL1bz38mFGTyffJb25DGpaEGIiPTR7dq560VdIXaKAEBLq9sVl1-2B-2BRDKL4D0J2OAJTTFSYIs07rHvbIHw-3D-3D&amp;source=gmail&amp;ust=1684859221061000&amp;usg=AOvVaw0IUWachcinSYOeJ36YJ2tp"
															><img
																src="https://ci3.googleusercontent.com/proxy/1r-2vzVLcsXOpbFMuS1z_1wAHilkgE7VFmSK2du-iSEE9y_IDtifkp_7W6Tl0I8cWPm-LpQkJJjwV-MWuUOCR9f8ODWCK6t1yzb40sb10EICj67F2A3ZaCIPBmtk9CdzZCBQ65LpsCExriQv8CzuM_4vxPC8UCV_Q6zlmJ5gj3hTZ7ObfIF2nkBXNKBsxB_o8mlvE0HvKyviDRH3jOdMhZUE6f84W3J0mPP3uMuxWfT3vmV9IRKqPAQoC5WlegZTQnruwsQq3A=s0-d-e1-ft#https://res.cloudinary.com/startup-grind/image/upload/c_fit,dpr_2.0,f_auto,g_center,h_60,q_auto:good,w_500/v1/gcs/platform-data-dsc/contentbuilder/logo_dark_horizontal_WVttpzD.png"
																alt=""
																height="30"
																border="0"
														/></a>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
			</tbody>
		</table>
		<img
			style="
				height: 1px !important;
				width: 1px !important;
				border-width: 0 !important;
				padding: 0 !important;
				margin: 0 !important;
			"
			src="https://ci5.googleusercontent.com/proxy/TM6Pu1jLMfEZO_Tw9fwBSCQg-_Pi4GoWDRH35_cS3oyS5zEJY192JqakvAo1DhL-as5PJ4a6vXaGyc_RBmzAEefu_kEfQ-XVEkQdQyj7H1VrlFa69UU1OjU3_Nq59DjkomUOP8_HQ97JUvlJbMESxO44jsyhXKtDA5jqHp8nRcpNnT1B131kO5lyHPulNQAstGE4pzXGdMBFepwi7Ad_axpSVr6y0jKa1xQzBHoVFIAnSsT0hMIpgUdty2J68SHBvBw9vjZHvbqMNTIaVYPTEHITn5lzsWxlDmXnw3eRc7VG14OFYq_Yijz686eSRqmntwBjI-247ST5KR8mD3v1d0xvJEWIgzCDz3ulJCHPYJaYu3TTRcKeyak4C856HHnEaC3RSa0iRt0UgUUz7zGVufO6bzg8yMqiS5I=s0-d-e1-ft#https://u16161593.ct.sendgrid.net/wf/open?upn=f9BVIBTE4MV61d5WjyC1xRBeR2D0-2FN201XFXTlyGhGyQgyHSETzPOsJgbL-2B6iWKcS5VFV0WSwLBEXJd1jcrJJuKwQm68GVMxsvpPG6KQ1MJzOJFj03Z-2FRqTFChIYweOcYW9QeGejF3u-2F9B11dZqzfjxleppWee-2FQ7IDcefEpxjuVE12hEsfPoZJNwF1utRzsCPvDW4FPYrxy3On5PFdlWE7kzdkn5ZSFwW1Pu2CyJj4-3D"
			alt=""
			width="1"
			height="1"
			border="0" />
	</div>
</div>
    `
}

export function SEMINAR_2_1_DAY_REMINDER_EMAIL(
    receiver: string
) {
    return `
    <div dir="ltr">
	<div
		style="
			background-color: #f6f7f9;
			margin: 0;
			padding: 0;
			font-family: 'Open Sans', Arial, sans-serif !important;
			font-weight: 400;
			color: #202124;
		">
		<table border="0" width="100%" cellspacing="0" cellpadding="15">
			<tbody>
				<tr>
					<td style="background-color: #f6f7f9" align="center" width="100%">
						<table
							style="
								border-bottom-left-radius: 4px;
								border-bottom-right-radius: 4px;
								overflow: hidden;
								min-width: 290px;
								max-width: 700px;
							"
							border="0"
							cellspacing="0"
							cellpadding="0">
							<tbody>
								<tr>
									<td>
										<table
											border="0"
											width="100%"
											cellspacing="0"
											cellpadding="0">
											<tbody>
												<tr>
													<td
														style="
															padding: 0 0 15px;
															font-family: 'Open Sans', Arial, sans-serif !important;
														"
														valign="middle">
														<a
															style="
																font-size: 12px;
																color: #6f6f6f !important;
																padding: 1px 0;
																text-decoration: none !important;
															"
															href="https://streaklinks.com/BT8hHi6i4sz87Zu_jgWlHBim/https%3A%2F%2Fu16161593.ct.sendgrid.net%2Fls%2Fclick%3Fupn%3D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0LwznXXv5-2BoPgUHFt4ZMWenhtzqm7TjwMiA-2FFAAcTgMmUzqjVEhGztoc3RXmIWr31f9U-3DI0CU_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utc0IXBPSuXDsulPt-2BMuYAqYyOAd83zZixxdWawNN-2BT-2BiEAS7-2Bs49aOD3vNf7i12oczTvTKAg7vnxumi6yz7-2BrLhBQeoo95o72ChUsisLrcxpHCbTdj3-2Fpf0KoNR-2B9tXM6uj3lrwEddbE5MTql81MA0wQ-3D-3D"
															target="_blank"
															data-saferedirecturl="https://www.google.com/url?q=https://streaklinks.com/BT8hHi6i4sz87Zu_jgWlHBim/https%253A%252F%252Fu16161593.ct.sendgrid.net%252Fls%252Fclick%253Fupn%253D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0LwznXXv5-2BoPgUHFt4ZMWenhtzqm7TjwMiA-2FFAAcTgMmUzqjVEhGztoc3RXmIWr31f9U-3DI0CU_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utc0IXBPSuXDsulPt-2BMuYAqYyOAd83zZixxdWawNN-2BT-2BiEAS7-2Bs49aOD3vNf7i12oczTvTKAg7vnxumi6yz7-2BrLhBQeoo95o72ChUsisLrcxpHCbTdj3-2Fpf0KoNR-2B9tXM6uj3lrwEddbE5MTql81MA0wQ-3D-3D&amp;source=gmail&amp;ust=1686936655679000&amp;usg=AOvVaw2FD_qGqKJl4S2MseTvSThL">
															Google Developer Student Clubs - VNU HCM -
															University of Technology
														</a>
													</td>
													<td
														style="
															padding: 0 0 15px;
															font-family: 'Open Sans', Arial, sans-serif !important;
														"
														align="right"
														valign="middle">
														&nbsp;
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
								<tr>
									<td
										style="
											width: 700px;
											height: 136px;
											vertical-align: middle;
											border-bottom: 0px solid #f6f7f9;
											background-image: url('https://ci3.googleusercontent.com/proxy/jTbSl0_Srn4p-vihHLXnamvPIRqeZxUV8BUKAc3K9e9SGOUfkrvcSD4lXc-hrT8Xy6TJTpGAoO1_1YQhcYJhuyEUTFyhmZKHILgw709SiBMN2jTydWgf-PLxJc7UJrg8BTjB7aVfi1k1LjsoJov1dIrrxeNjzDGWSWctWk0mu2U2Ob7UM1QWU8BrNTkvaA8PdcQqyhXjlHU-J7n3k5vcCTHI6QZno8Eei93sXQGLfNiw_9nWGxWmgA=s0-d-e1-ft#https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,h_135,q_auto:eco,w_600/v1/gcs/platform-data-dsc/contentbuilder/email_header.png');
											background-color: #fff;
											border-top-right-radius: 4px;
											border-top-left-radius: 4px;
											background-size: cover;
										">
										<table
											style="width: 100%"
											border="0"
											width="100%"
											cellspacing="20"
											cellpadding="0">
											<tbody>
												<tr>
													<td
														style="vertical-align: middle; text-align: center">
														<div style="display: inline-block">
															<a
																style="text-align: center; display: block"
																href="https://streaklinks.com/BT8hHi6PT1YYETjglwM_Hm9E/https%3A%2F%2Fu16161593.ct.sendgrid.net%2Fls%2Fclick%3Fupn%3D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0LwznXXv5-2BoPgUHFt4ZMWenhtzqm7TjwMiA-2FFAAcTgMmUzqjVEhGztoc3RXmIWr31f9U-3D1WWW_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utcOdQF6JS3ei-2Fi-2B544Dvf86oqppqJ8ierQQhGgjkxucq7fumdIZnstg-2BFUndpO-2FfxP4Ly3TP4GzCOy9ht90I8WESMt6kPH7KOOCcKJJqWM79bCah4CxTulb6AN7wK5cJ2S-2FdFuFhMq1xCBL1vObinRiQ-3D-3D"
																target="_blank"
																data-saferedirecturl="https://www.google.com/url?q=https://streaklinks.com/BT8hHi6PT1YYETjglwM_Hm9E/https%253A%252F%252Fu16161593.ct.sendgrid.net%252Fls%252Fclick%253Fupn%253D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0LwznXXv5-2BoPgUHFt4ZMWenhtzqm7TjwMiA-2FFAAcTgMmUzqjVEhGztoc3RXmIWr31f9U-3D1WWW_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utcOdQF6JS3ei-2Fi-2B544Dvf86oqppqJ8ierQQhGgjkxucq7fumdIZnstg-2BFUndpO-2FfxP4Ly3TP4GzCOy9ht90I8WESMt6kPH7KOOCcKJJqWM79bCah4CxTulb6AN7wK5cJ2S-2FdFuFhMq1xCBL1vObinRiQ-3D-3D&amp;source=gmail&amp;ust=1686936655679000&amp;usg=AOvVaw0GxOEe1Di1JprWz4fc4heE">
																<img
																	src="https://ci3.googleusercontent.com/proxy/wEsj66QGvdQacrMw4Qm3A1r-Gbyd3Uz7XY2HRkhxyXCxKpzCzuqi2KlBu70FVmRXCvpd7HqgnKJFFW2ga4xiGnLgF1jjWDvQfTAgMBbC_onFujTrhFAl99zrDBLsS6moSRMG2EAHgFGRL2dLMbG-0GkgcVd3pOEeeTJzZzhI6CuspG6FeRi177hNC7sRe2INLGkoVoVMrgzZhPiZs4HnGot13yae4p1VnyKpydIqCwul8OV7wDdlCBT8EQ9K6HTlNVMM49A=s0-d-e1-ft#https://res.cloudinary.com/startup-grind/image/upload/c_fit,dpr_2.0,f_auto,g_center,h_100,q_auto:good,w_500/v1/gcs/platform-data-dsc/contentbuilder/logo_dark_stacked_ziDh4mP.png"
																	alt="Google Developer Student Clubs"
																	height="50"
																	border="0" />
															</a>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
								<tr>
									<td style="padding-top: 1px">
										<table
											style="width: 99.833055%"
											border="0"
											cellspacing="0"
											cellpadding="0">
											<tbody>
												<tr>
													<td
														style="
															background-color: #ffffff;
															padding: 25px 35px;
															text-align: left;
															font-size: 14px;
															line-height: 20px;
															font-family: 'Open Sans', Arial, sans-serif !important;
															width: 100%;
														"
														align="center"
														valign="top">
														<p
															dir="ltr"
															style="
																line-height: 1.656;
																text-align: justify;
																margin-top: 0pt;
																margin-bottom: 10pt;
															">
															<span
																style="
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(0, 0, 0);
																	background-color: transparent;
																	font-weight: 400;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																"
																>Xin chào</span
															><span
																style="
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(0, 0, 0);
																	background-color: transparent;
																	font-weight: 700;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																">
																${receiver}</span
															>
														</p>
														<p
															dir="ltr"
															style="
																line-height: 2.16;
																text-align: justify;
																margin-top: 0pt;
																margin-bottom: 10pt;
															">
															<span
																style="
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(0, 0, 0);
																	background-color: transparent;
																	font-weight: 400;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																"
																>Ban tổ chức chỉ muốn nhắc nhở bạn rằng sự kiện </span
															><span
																style="
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(0, 0, 0);
																	background-color: transparent;
																	font-weight: 700;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																"
																>"Seminar 2: Presenting Your Idea"</span
															><span
																style="
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(0, 0, 0);
																	background-color: transparent;
																	font-weight: 400;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																">
																đang đến rất gần. Chỉ còn vỏn vẹn một ngày nữa
																thôi, sự kiện sẽ chính thức diễn ra.</span
															>
														</p>
														<p
															dir="ltr"
															style="
																line-height: 2.16;
																text-align: justify;
																margin-top: 0pt;
																margin-bottom: 10pt;
															">
															<span
																style="
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(0, 0, 0);
																	background-color: transparent;
																	font-weight: 400;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																"
																>Tại sự kiện, diễn giả Thái Lâm sẽ là người chia
																sẻ chính của sự kiện, với cương vị là </span
															><span
																style="
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(0, 0, 0);
																	background-color: transparent;
																	font-weight: 700;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																"
																>Lead UX/Product Design tại
																<span
																	zeum4c10="PR_7_0"
																	data-ddnwab="PR_7_0"
																	aria-invalid="spelling"
																	class="LI ng"
																	>BAEMIN</span
																></span
															><span
																style="
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(0, 0, 0);
																	background-color: transparent;
																	font-weight: 400;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																"
																>, những kinh nghiệm và chia sẻ của anh sẽ là
																những thông tin hữu ích cho kết quả của các đội
																thi. Vì ý tưởng hay cũng cần phải được trình bày
																tốt đúng không nào?</span
															>
														</p>
														<p
															dir="ltr"
															style="
																line-height: 1.656;
																text-align: justify;
																margin-top: 0pt;
																margin-bottom: 10pt;
															">
															<span
																style="
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(0, 0, 0);
																	background-color: transparent;
																	font-weight: 700;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																"
																>Seminar 2: Presenting Your Idea</span
															>
														</p>
														<ul
															style="
																margin-top: 0px;
																margin-bottom: 0px;
																padding-inline-start: 48px;
															">
															<li
																dir="ltr"
																style="
																	list-style-type: disc;
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(0, 0, 0);
																	background-color: transparent;
																	font-weight: 400;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																">
																<p
																	dir="ltr"
																	style="
																		line-height: 1.8;
																		text-align: justify;
																		margin-top: 0pt;
																		margin-bottom: 0pt;
																	"
																	role="presentation">
																	<span
																		style="
																			font-size: 12pt;
																			font-family: Arial;
																			color: rgb(0, 0, 0);
																			background-color: transparent;
																			font-weight: 700;
																			font-style: normal;
																			font-variant: normal;
																			text-decoration: none;
																		"
																		>Thời gian: 08:30 - 11:30, ngày
																		17/06/2023</span
																	>
																</p>
															</li>
															<li
																dir="ltr"
																style="
																	list-style-type: disc;
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(0, 0, 0);
																	background-color: transparent;
																	font-weight: 400;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																">
																<p
																	dir="ltr"
																	style="
																		line-height: 1.8;
																		text-align: justify;
																		margin-top: 0pt;
																		margin-bottom: 0pt;
																	"
																	role="presentation">
																	<span
																		style="
																			font-size: 12pt;
																			font-family: Arial;
																			color: rgb(0, 0, 0);
																			background-color: transparent;
																			font-weight: 700;
																			font-style: normal;
																			font-variant: normal;
																			text-decoration: none;
																		"
																		>Nền tảng</span
																	><span
																		style="
																			font-size: 12pt;
																			font-family: Arial;
																			color: rgb(0, 0, 0);
																			background-color: transparent;
																			font-weight: 400;
																			font-style: normal;
																			font-variant: normal;
																			text-decoration: none;
																		"
																		>: Online thông qua</span
																	><a
																		href="https://us02web.zoom.us/j/4040924271?pwd=cnhpZ0hNaThOL2JaYld0Unc3Zkxsdz09"
																		style="text-decoration: none"
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			">
																		</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(17, 85, 204);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: underline;
																				text-decoration-skip-ink: none;
																			"
																			>Zoom</span
																		></a
																	>
																</p>
															</li>
															<ul
																style="
																	margin-top: 0px;
																	margin-bottom: 0px;
																	padding-inline-start: 48px;
																">
																<li
																	dir="ltr"
																	style="
																		list-style-type: circle;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	<p
																		dir="ltr"
																		style="
																			line-height: 1.8;
																			text-align: justify;
																			margin-top: 0pt;
																			margin-bottom: 0pt;
																		"
																		role="presentation">
																		<span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>Meeting ID:</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			">
																			404 092 4271</span
																		>
																	</p>
																</li>
																<li
																	dir="ltr"
																	style="
																		list-style-type: circle;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	<p
																		dir="ltr"
																		style="
																			line-height: 1.8;
																			text-align: justify;
																			margin-top: 0pt;
																			margin-bottom: 0pt;
																		"
																		role="presentation">
																		<span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>Passcode:</span
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			">
																			g6azej</span
																		>
																	</p>
																</li>
															</ul>
														</ul>
														<p
															dir="ltr"
															style="
																line-height: 2.16;
																text-align: justify;
																margin-top: 0pt;
																margin-bottom: 10pt;
															">
															<span
																style="
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(0, 0, 0);
																	background-color: transparent;
																	font-weight: 400;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																"
																>Tham gia cuộc thi cũng như các sự kiện các bạn
																sẽ có thêm các trải nghiệm đáng giá trong mùa hè
																này cùng các giải thưởng, phần quà đặc biệt (áo
																thun, túi tote, bút, móc khóa, bình nước...) từ
																GDSC HCMUT.</span
															>
														</p>
														<p
															dir="ltr"
															style="
																line-height: 2.16;
																text-align: justify;
																margin-top: 0pt;
																margin-bottom: 10pt;
															">
															<span
																style="
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(0, 0, 0);
																	background-color: transparent;
																	font-weight: 400;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																"
																>Xem thêm về dòng thời gian chi tiết của sự kiện
																và thông tin về các diễn giả tại website của
																cuộc thi</span
															><a
																href="https://gdsc.app/"
																style="text-decoration: none"
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																</span
																><span
																	style="
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(17, 85, 204);
																		background-color: transparent;
																		font-weight: 700;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: underline;
																		text-decoration-skip-ink: none;
																	"
																	>gdsc.app</span
																></a
															><span
																style="
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(0, 0, 0);
																	background-color: transparent;
																	font-weight: 400;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																"
																>.</span
															>
														</p>
														<div
															style="color: rgb(0, 0, 0); text-align: center">
															<a
																href="https://gdsc.app/event/seminar2"
																style="
																	display: block;
																	padding: 0.75rem 1.25rem;
																	border-radius: 0.5rem;
																	color: rgb(255, 255, 255);
																	text-transform: uppercase;
																	font-size: 1rem;
																	text-decoration-line: none;
																	background-color: rgba(232, 99, 87, 0.906);
																	margin: 0.5rem auto;
																	width: fit-content;
																	font-family: Arial, sans-serif;
																"
																target="_blank"
																data-saferedirecturl="https://www.google.com/url?q=https://gdsc.app/event/seminar2&amp;source=gmail&amp;ust=1686936655680000&amp;usg=AOvVaw1fM8VGwMO2pc6yfFmGwVgn"
																><b>THÔNG TIN SEMINAR 2</b></a
															>
														</div>
														<p
															dir="ltr"
															style="
																line-height: 1.8;
																text-align: justify;
																margin-top: 0pt;
																margin-bottom: 10pt;
															">
															<span
																style="
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(0, 0, 0);
																	background-color: transparent;
																	font-weight: 400;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																"
																>GDSC HCMUT rất vui vì được đồng hành cùng bạn
																trong sự kiện này.</span
															>
														</p>
														<p
															dir="ltr"
															style="
																line-height: 1.8;
																text-align: justify;
																margin-top: 0pt;
																margin-bottom: 10pt;
															">
															<span
																style="
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(0, 0, 0);
																	background-color: transparent;
																	font-weight: 400;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																"
																>Cảm ơn./.</span
															>
														</p>
														<p
															dir="ltr"
															style="
																color: rgb(0, 0, 0);
																line-height: 1.656;
																margin-top: 0pt;
																margin-bottom: 0pt;
															">
															<span
																style="
																	font-family: 'Google Sans', sans-serif;
																	font-size: 12pt;
																	text-align: justify;
																"
																>–</span
															>
														</p>
														<p
															dir="ltr"
															style="
																color: rgb(0, 0, 0);
																line-height: 1.656;
																margin-top: 0pt;
																margin-bottom: 0pt;
															">
															<span
																style="
																	color: rgb(66, 133, 244);
																	font-family: 'Google Sans', sans-serif;
																	font-size: 13pt;
																	font-weight: 700;
																	text-align: justify;
																"
																>Google Developer Student Club - HCMUT</span
															>
														</p>
														<p
															dir="ltr"
															style="
																color: rgb(0, 0, 0);
																line-height: 1.656;
																margin-top: 0pt;
																margin-bottom: 0pt;
															">
															<span
																style="
																	color: rgb(85, 85, 85);
																	font-family: 'Google Sans', sans-serif;
																	font-size: 11pt;
																	text-align: justify;
																"
																>Ho Chi Minh City University of Technology</span
															>
														</p>
														<p
															dir="ltr"
															style="
																color: rgb(0, 0, 0);
																line-height: 1.656;
																margin-top: 0pt;
																margin-bottom: 0pt;
															">
															<span
																style="
																	text-align: justify;
																	font-variant-numeric: normal;
																	font-variant-east-asian: normal;
																	font-variant-alternates: normal;
																	font-size: 10pt;
																	font-family: 'Google Sans', sans-serif;
																	color: rgb(85, 85, 85);
																	font-weight: 700;
																	font-style: italic;
																"
																>Email:</span
															><span
																style="
																	text-align: justify;
																	font-variant-numeric: normal;
																	font-variant-east-asian: normal;
																	font-variant-alternates: normal;
																	font-size: 10pt;
																	font-family: 'Google Sans', sans-serif;
																	color: rgb(85, 85, 85);
																	font-style: italic;
																"
																>&nbsp;</span
															><span
																style="
																	text-align: justify;
																	font-variant-numeric: normal;
																	font-variant-east-asian: normal;
																	font-variant-alternates: normal;
																	font-size: 10pt;
																	font-family: 'Google Sans', sans-serif;
																	color: rgb(17, 85, 204);
																	font-style: italic;
																"
																><a
																	href="mailto:contact@gdschcmut.dev"
																	target="_blank"
																	>contact@gdschcmut.dev</a
																></span
															>
														</p>
														<p
															dir="ltr"
															style="
																color: rgb(0, 0, 0);
																line-height: 1.656;
																margin-top: 0pt;
																margin-bottom: 0pt;
															">
															<span
																style="
																	text-align: justify;
																	font-variant-numeric: normal;
																	font-variant-east-asian: normal;
																	font-variant-alternates: normal;
																	font-size: 10pt;
																	font-family: 'Google Sans', sans-serif;
																	color: rgb(85, 85, 85);
																	font-weight: 700;
																	font-style: italic;
																"
																>Facebook:</span
															><a
																href="https://www.facebook.com/dscxhcmut/"
																hspace="streak-track"
																style="
																	text-align: justify;
																	text-decoration-line: none;
																"
																target="_blank"
																data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/dscxhcmut/&amp;source=gmail&amp;ust=1686936655680000&amp;usg=AOvVaw1T4gN6zaVIawLOF-SZlw11"
																><span
																	style="
																		font-size: 10pt;
																		font-family: 'Google Sans', sans-serif;
																		font-weight: 700;
																		font-style: italic;
																		font-variant-numeric: normal;
																		font-variant-east-asian: normal;
																		font-variant-alternates: normal;
																		text-decoration-line: underline;
																	"
																	>&nbsp;</span
																><span
																	style="
																		font-size: 10pt;
																		font-family: 'Google Sans', sans-serif;
																		font-style: italic;
																		font-variant-numeric: normal;
																		font-variant-east-asian: normal;
																		font-variant-alternates: normal;
																		text-decoration-line: underline;
																	"
																	>https://www.<wbr />facebook.com/dscxhcmut/</span
																></a
															>
														</p>
														<p
															dir="ltr"
															style="
																color: rgb(0, 0, 0);
																line-height: 1.656;
																margin-top: 0pt;
																margin-bottom: 0pt;
															">
															<span
																style="
																	text-align: justify;
																	font-variant-numeric: normal;
																	font-variant-east-asian: normal;
																	font-variant-alternates: normal;
																	font-size: 10pt;
																	font-family: 'Google Sans', sans-serif;
																	color: rgb(85, 85, 85);
																	font-weight: 700;
																	font-style: italic;
																"
																>Address:</span
															><span
																style="
																	text-align: justify;
																	font-variant-numeric: normal;
																	font-variant-east-asian: normal;
																	font-variant-alternates: normal;
																	font-size: 10pt;
																	font-family: 'Google Sans', sans-serif;
																	color: rgb(85, 85, 85);
																	font-style: italic;
																"
																>&nbsp;268 Ly Thuong Kiet, Ward 14, District 10,
																Ho Chi Minh City</span
															>
														</p>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
								<tr>
									<td>
										<table
											border="0"
											width="100%"
											cellspacing="0"
											cellpadding="0">
											<tbody>
												<tr>
													<td
														style="
															background-color: #ffffff;
															border-top: 1px solid #f6f7f9;
															padding: 40px 0 40px;
															font-size: 13px;
															color: #7e8890;
														"
														align="center">
														<a
															href="https://streaklinks.com/BT8hHi6ERIjsu_ZJEAk4wpeN/https%3A%2F%2Fu16161593.ct.sendgrid.net%2Fls%2Fclick%3Fupn%3D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0Lwzg9C4VAJP20noOG84jTS0macmi_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utclyf2jsJXHRWfDwAkctFUwX73MYpmhWoeW8oW3o4G-2BckDWo-2B-2BpTWXVDLrSObETzmtUBODjGL1bz38mFGTyffJb25DGpaEGIiPTR7dq560VdIXaKAEBLq9sVl1-2B-2BRDKL4D0J2OAJTTFSYIs07rHvbIHw-3D-3D"
															target="_blank"
															data-saferedirecturl="https://www.google.com/url?q=https://streaklinks.com/BT8hHi6ERIjsu_ZJEAk4wpeN/https%253A%252F%252Fu16161593.ct.sendgrid.net%252Fls%252Fclick%253Fupn%253D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0Lwzg9C4VAJP20noOG84jTS0macmi_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utclyf2jsJXHRWfDwAkctFUwX73MYpmhWoeW8oW3o4G-2BckDWo-2B-2BpTWXVDLrSObETzmtUBODjGL1bz38mFGTyffJb25DGpaEGIiPTR7dq560VdIXaKAEBLq9sVl1-2B-2BRDKL4D0J2OAJTTFSYIs07rHvbIHw-3D-3D&amp;source=gmail&amp;ust=1686936655680000&amp;usg=AOvVaw08h0HLqngO_NEcicXiFVjt"
															><img
																src="https://ci3.googleusercontent.com/proxy/1r-2vzVLcsXOpbFMuS1z_1wAHilkgE7VFmSK2du-iSEE9y_IDtifkp_7W6Tl0I8cWPm-LpQkJJjwV-MWuUOCR9f8ODWCK6t1yzb40sb10EICj67F2A3ZaCIPBmtk9CdzZCBQ65LpsCExriQv8CzuM_4vxPC8UCV_Q6zlmJ5gj3hTZ7ObfIF2nkBXNKBsxB_o8mlvE0HvKyviDRH3jOdMhZUE6f84W3J0mPP3uMuxWfT3vmV9IRKqPAQoC5WlegZTQnruwsQq3A=s0-d-e1-ft#https://res.cloudinary.com/startup-grind/image/upload/c_fit,dpr_2.0,f_auto,g_center,h_60,q_auto:good,w_500/v1/gcs/platform-data-dsc/contentbuilder/logo_dark_horizontal_WVttpzD.png"
																alt=""
																height="30"
																border="0"
														/></a>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
			</tbody>
		</table>
		<img
			style="
				height: 1px !important;
				width: 1px !important;
				border-width: 0 !important;
				padding: 0 !important;
				margin: 0 !important;
			"
			src="https://ci5.googleusercontent.com/proxy/TM6Pu1jLMfEZO_Tw9fwBSCQg-_Pi4GoWDRH35_cS3oyS5zEJY192JqakvAo1DhL-as5PJ4a6vXaGyc_RBmzAEefu_kEfQ-XVEkQdQyj7H1VrlFa69UU1OjU3_Nq59DjkomUOP8_HQ97JUvlJbMESxO44jsyhXKtDA5jqHp8nRcpNnT1B131kO5lyHPulNQAstGE4pzXGdMBFepwi7Ad_axpSVr6y0jKa1xQzBHoVFIAnSsT0hMIpgUdty2J68SHBvBw9vjZHvbqMNTIaVYPTEHITn5lzsWxlDmXnw3eRc7VG14OFYq_Yijz686eSRqmntwBjI-247ST5KR8mD3v1d0xvJEWIgzCDz3ulJCHPYJaYu3TTRcKeyak4C856HHnEaC3RSa0iRt0UgUUz7zGVufO6bzg8yMqiS5I=s0-d-e1-ft#https://u16161593.ct.sendgrid.net/wf/open?upn=f9BVIBTE4MV61d5WjyC1xRBeR2D0-2FN201XFXTlyGhGyQgyHSETzPOsJgbL-2B6iWKcS5VFV0WSwLBEXJd1jcrJJuKwQm68GVMxsvpPG6KQ1MJzOJFj03Z-2FRqTFChIYweOcYW9QeGejF3u-2F9B11dZqzfjxleppWee-2FQ7IDcefEpxjuVE12hEsfPoZJNwF1utRzsCPvDW4FPYrxy3On5PFdlWE7kzdkn5ZSFwW1Pu2CyJj4-3D"
			alt=""
			width="1"
			height="1"
			border="0" />
	</div>
</div>
    `
}

export function SEMINAR_2_3O_MINUTE_REMINDER_EMAIL(
    receiver: string
) {
    return `
    <div dir="ltr">
	<div
		style="
			background-color: #f6f7f9;
			margin: 0;
			padding: 0;
			font-family: 'Open Sans', Arial, sans-serif !important;
			font-weight: 400;
			color: #202124;
		">
		<table border="0" width="100%" cellspacing="0" cellpadding="15">
			<tbody>
				<tr>
					<td style="background-color: #f6f7f9" align="center" width="100%">
						<table
							style="
								border-bottom-left-radius: 4px;
								border-bottom-right-radius: 4px;
								overflow: hidden;
								min-width: 290px;
								max-width: 600px;
							"
							border="0"
							cellspacing="0"
							cellpadding="0">
							<tbody>
								<tr>
									<td>
										<table
											border="0"
											width="100%"
											cellspacing="0"
											cellpadding="0">
											<tbody>
												<tr>
													<td
														style="
															padding: 0 0 15px;
															font-family: 'Open Sans', Arial, sans-serif !important;
														"
														valign="middle">
														<a
															style="
																font-size: 12px;
																color: #6f6f6f !important;
																padding: 1px 0;
																text-decoration: none !important;
															"
															href="https://streaklinks.com/BT8hHi6i4sz87Zu_jgWlHBim/https%3A%2F%2Fu16161593.ct.sendgrid.net%2Fls%2Fclick%3Fupn%3D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0LwznXXv5-2BoPgUHFt4ZMWenhtzqm7TjwMiA-2FFAAcTgMmUzqjVEhGztoc3RXmIWr31f9U-3DI0CU_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utc0IXBPSuXDsulPt-2BMuYAqYyOAd83zZixxdWawNN-2BT-2BiEAS7-2Bs49aOD3vNf7i12oczTvTKAg7vnxumi6yz7-2BrLhBQeoo95o72ChUsisLrcxpHCbTdj3-2Fpf0KoNR-2B9tXM6uj3lrwEddbE5MTql81MA0wQ-3D-3D"
															target="_blank"
															data-saferedirecturl="https://www.google.com/url?q=https://streaklinks.com/BT8hHi6i4sz87Zu_jgWlHBim/https%253A%252F%252Fu16161593.ct.sendgrid.net%252Fls%252Fclick%253Fupn%253D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0LwznXXv5-2BoPgUHFt4ZMWenhtzqm7TjwMiA-2FFAAcTgMmUzqjVEhGztoc3RXmIWr31f9U-3DI0CU_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utc0IXBPSuXDsulPt-2BMuYAqYyOAd83zZixxdWawNN-2BT-2BiEAS7-2Bs49aOD3vNf7i12oczTvTKAg7vnxumi6yz7-2BrLhBQeoo95o72ChUsisLrcxpHCbTdj3-2Fpf0KoNR-2B9tXM6uj3lrwEddbE5MTql81MA0wQ-3D-3D&amp;source=gmail&amp;ust=1686937100176000&amp;usg=AOvVaw2bPvd2H5HECteuiRdKCSlP">
															Google Developer Student Clubs - VNU HCM -
															University of Technology
														</a>
													</td>
													<td
														style="
															padding: 0 0 15px;
															font-family: 'Open Sans', Arial, sans-serif !important;
														"
														align="right"
														valign="middle">
														&nbsp;
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
								<tr>
									<td
										style="
											width: 600px;
											height: 136px;
											vertical-align: middle;
											border-bottom: 0px solid #f6f7f9;
											background-image: url('https://ci3.googleusercontent.com/proxy/jTbSl0_Srn4p-vihHLXnamvPIRqeZxUV8BUKAc3K9e9SGOUfkrvcSD4lXc-hrT8Xy6TJTpGAoO1_1YQhcYJhuyEUTFyhmZKHILgw709SiBMN2jTydWgf-PLxJc7UJrg8BTjB7aVfi1k1LjsoJov1dIrrxeNjzDGWSWctWk0mu2U2Ob7UM1QWU8BrNTkvaA8PdcQqyhXjlHU-J7n3k5vcCTHI6QZno8Eei93sXQGLfNiw_9nWGxWmgA=s0-d-e1-ft#https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2.0,f_auto,g_center,h_135,q_auto:eco,w_600/v1/gcs/platform-data-dsc/contentbuilder/email_header.png');
											background-color: #fff;
											border-top-right-radius: 4px;
											border-top-left-radius: 4px;
											background-size: cover;
										">
										<table
											style="width: 100%"
											border="0"
											width="100%"
											cellspacing="20"
											cellpadding="0">
											<tbody>
												<tr>
													<td
														style="vertical-align: middle; text-align: center">
														<div style="display: inline-block">
															<a
																style="text-align: center; display: block"
																href="https://streaklinks.com/BT8hHi6PT1YYETjglwM_Hm9E/https%3A%2F%2Fu16161593.ct.sendgrid.net%2Fls%2Fclick%3Fupn%3D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0LwznXXv5-2BoPgUHFt4ZMWenhtzqm7TjwMiA-2FFAAcTgMmUzqjVEhGztoc3RXmIWr31f9U-3D1WWW_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utcOdQF6JS3ei-2Fi-2B544Dvf86oqppqJ8ierQQhGgjkxucq7fumdIZnstg-2BFUndpO-2FfxP4Ly3TP4GzCOy9ht90I8WESMt6kPH7KOOCcKJJqWM79bCah4CxTulb6AN7wK5cJ2S-2FdFuFhMq1xCBL1vObinRiQ-3D-3D"
																target="_blank"
																data-saferedirecturl="https://www.google.com/url?q=https://streaklinks.com/BT8hHi6PT1YYETjglwM_Hm9E/https%253A%252F%252Fu16161593.ct.sendgrid.net%252Fls%252Fclick%253Fupn%253D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0LwznXXv5-2BoPgUHFt4ZMWenhtzqm7TjwMiA-2FFAAcTgMmUzqjVEhGztoc3RXmIWr31f9U-3D1WWW_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utcOdQF6JS3ei-2Fi-2B544Dvf86oqppqJ8ierQQhGgjkxucq7fumdIZnstg-2BFUndpO-2FfxP4Ly3TP4GzCOy9ht90I8WESMt6kPH7KOOCcKJJqWM79bCah4CxTulb6AN7wK5cJ2S-2FdFuFhMq1xCBL1vObinRiQ-3D-3D&amp;source=gmail&amp;ust=1686937100176000&amp;usg=AOvVaw3UxALU_dSEoV6s30hWMQVz">
																<img
																	src="https://ci3.googleusercontent.com/proxy/wEsj66QGvdQacrMw4Qm3A1r-Gbyd3Uz7XY2HRkhxyXCxKpzCzuqi2KlBu70FVmRXCvpd7HqgnKJFFW2ga4xiGnLgF1jjWDvQfTAgMBbC_onFujTrhFAl99zrDBLsS6moSRMG2EAHgFGRL2dLMbG-0GkgcVd3pOEeeTJzZzhI6CuspG6FeRi177hNC7sRe2INLGkoVoVMrgzZhPiZs4HnGot13yae4p1VnyKpydIqCwul8OV7wDdlCBT8EQ9K6HTlNVMM49A=s0-d-e1-ft#https://res.cloudinary.com/startup-grind/image/upload/c_fit,dpr_2.0,f_auto,g_center,h_100,q_auto:good,w_500/v1/gcs/platform-data-dsc/contentbuilder/logo_dark_stacked_ziDh4mP.png"
																	alt="Google Developer Student Clubs"
																	height="50"
																	border="0" />
															</a>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
								<tr>
									<td style="padding-top: 1px">
										<table
											border="0"
											width="100%"
											cellspacing="0"
											cellpadding="0">
											<tbody>
												<tr style="height: 568.703px">
													<td
														style="
															background-color: #ffffff;
															padding: 25px 35px;
															text-align: left;
															font-size: 14px;
															line-height: 20px;
															font-family: 'Open Sans', Arial, sans-serif !important;
															height: 568.703px;
														"
														align="center"
														valign="top">
														<p
															dir="ltr"
															style="
																line-height: 1.8;
																background-color: rgb(255, 255, 255);
																margin-top: 0pt;
																margin-bottom: 0pt;
																padding: 0pt 0pt 10pt;
															">
															<span
																style="
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(0, 0, 0);
																	background-color: transparent;
																	font-weight: 400;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																"
																>Xin chào </span
															><span
																style="
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(0, 0, 0);
																	background-color: transparent;
																	font-weight: 700;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																"
																>${receiver}</span
															><span
																style="
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(0, 0, 0);
																	background-color: transparent;
																	font-weight: 400;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																"
																>,</span
															>
														</p>
														<p
															dir="ltr"
															style="
																line-height: 1.8;
																text-align: justify;
																background-color: rgb(255, 255, 255);
																margin-top: 0pt;
																margin-bottom: 0pt;
																padding: 0pt 0pt 10pt;
															">
															<span
																style="
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(0, 0, 0);
																	background-color: transparent;
																	font-weight: 400;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																"
																>GDSC HCMUT muốn nhắn nhủ rằng sự kiện</span
															><span
																style="
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(0, 0, 0);
																	background-color: transparent;
																	font-weight: 700;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																">
																"Seminar 2: Presenting Your Idea</span
															><span
																style="
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(0, 0, 0);
																	background-color: transparent;
																	font-weight: 400;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																"
																>" thuộc chuỗi sự kiện </span
															><span
																style="
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(0, 0, 0);
																	background-color: transparent;
																	font-weight: 700;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																"
																>GDSC Idea Contest 2023: THiNK</span
															><span
																style="
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(0, 0, 0);
																	background-color: transparent;
																	font-weight: 400;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																">
																sẽ diễn ra sau </span
															><span
																style="
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(255, 0, 0);
																	background-color: transparent;
																	font-weight: 700;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																"
																>30 PHÚT</span
															><span
																style="
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(0, 0, 0);
																	background-color: transparent;
																	font-weight: 400;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																">
																nữa. </span
															><span
																style="
																	background-color: transparent;
																	color: rgb(0, 0, 0);
																	font-family: Arial;
																	font-size: 12pt;
																"
																>Ban tổ chức đã lên sóng, diễn giả đã chuẩn bị,
																còn chờ gì nữa mà không tham gia sự kiện để lắng
																nghe những chia sẻ của speaker cũng như đặt câu
																hỏi để chúng mình giải đáp những băn khoăn của
																bạn!</span
															>
														</p>
														<p
															dir="ltr"
															style="
																line-height: 1.8;
																background-color: rgb(255, 255, 255);
																margin-top: 0pt;
																margin-bottom: 10pt;
															">
															<span
																style="
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(0, 0, 0);
																	background-color: transparent;
																	font-weight: 700;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																"
																>Seminar 2: Presenting Your Idea</span
															>
														</p>
														<ul
															style="
																margin-top: 0px;
																margin-bottom: 0px;
																padding-inline-start: 48px;
															">
															<li
																dir="ltr"
																style="
																	list-style-type: disc;
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(0, 0, 0);
																	background-color: transparent;
																	font-weight: 700;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																">
																<p
																	dir="ltr"
																	style="
																		line-height: 1.8;
																		margin-top: 0pt;
																		margin-bottom: 0pt;
																	"
																	role="presentation">
																	<span
																		style="
																			font-size: 12pt;
																			font-family: Arial;
																			color: rgb(0, 0, 0);
																			background-color: transparent;
																			font-weight: 700;
																			font-style: normal;
																			font-variant: normal;
																			text-decoration: none;
																		"
																		>Thời gian: 08:30 - 11:30 ngày
																		17/06/2023.</span
																	>
																</p>
															</li>
															<li
																dir="ltr"
																style="
																	list-style-type: disc;
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(0, 0, 0);
																	background-color: transparent;
																	font-weight: 700;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																">
																<p
																	dir="ltr"
																	style="
																		line-height: 1.8;
																		margin-top: 0pt;
																		margin-bottom: 0pt;
																	"
																	role="presentation">
																	<span
																		style="
																			font-size: 12pt;
																			font-family: Arial;
																			color: rgb(0, 0, 0);
																			background-color: transparent;
																			font-weight: 700;
																			font-style: normal;
																			font-variant: normal;
																			text-decoration: none;
																		"
																		>Nền tảng: </span
																	><span
																		style="
																			font-size: 12pt;
																			font-family: Arial;
																			color: rgb(0, 0, 0);
																			background-color: transparent;
																			font-weight: 400;
																			font-style: normal;
																			font-variant: normal;
																			text-decoration: none;
																		"
																		>Online qua nền tảng Zoom</span
																	><span
																		style="
																			font-size: 12pt;
																			font-family: Arial;
																			color: rgb(0, 0, 0);
																			background-color: transparent;
																			font-weight: 700;
																			font-style: normal;
																			font-variant: normal;
																			text-decoration: none;
																		">
																	</span
																	><a
																		href="https://us02web.zoom.us/j/4040924271?pwd=cnhpZ0hNaThOL2JaYld0Unc3Zkxsdz09"
																		style="text-decoration: none"
																		><span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(17, 85, 204);
																				background-color: transparent;
																				font-weight: 700;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: underline;
																				text-decoration-skip-ink: none;
																			"
																			>tại đây</span
																		></a
																	>
																</p>
															</li>
															<ul
																style="
																	margin-top: 0px;
																	margin-bottom: 0px;
																	padding-inline-start: 48px;
																">
																<li
																	dir="ltr"
																	style="
																		list-style-type: circle;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	<p
																		dir="ltr"
																		style="
																			line-height: 1.8;
																			margin-top: 0pt;
																			margin-bottom: 0pt;
																		"
																		role="presentation">
																		<span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>Meeting ID: 404 092 4271</span
																		>
																	</p>
																</li>
																<li
																	dir="ltr"
																	style="
																		list-style-type: circle;
																		font-size: 12pt;
																		font-family: Arial;
																		color: rgb(0, 0, 0);
																		background-color: transparent;
																		font-weight: 400;
																		font-style: normal;
																		font-variant: normal;
																		text-decoration: none;
																	">
																	<p
																		dir="ltr"
																		style="
																			line-height: 1.8;
																			margin-top: 0pt;
																			margin-bottom: 10pt;
																		"
																		role="presentation">
																		<span
																			style="
																				font-size: 12pt;
																				font-family: Arial;
																				color: rgb(0, 0, 0);
																				background-color: transparent;
																				font-weight: 400;
																				font-style: normal;
																				font-variant: normal;
																				text-decoration: none;
																			"
																			>Passcode: g6azej</span
																		>
																	</p>
																</li>
															</ul>
														</ul>
														<p
															dir="ltr"
															style="
																line-height: 1.8;
																background-color: rgb(255, 255, 255);
																margin-top: 0pt;
																margin-bottom: 0pt;
																padding: 0pt 0pt 10pt;
															">
															<span
																style="
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(0, 0, 0);
																	background-color: transparent;
																	font-weight: 400;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																"
																>Hẹn gặp bạn ở sự kiện.</span
															>
														</p>
														<p
															dir="ltr"
															style="
																line-height: 1.8;
																background-color: rgb(255, 255, 255);
																margin-top: 0pt;
																margin-bottom: 10pt;
															">
															<span
																style="
																	font-size: 12pt;
																	font-family: Arial;
																	color: rgb(0, 0, 0);
																	background-color: transparent;
																	font-weight: 400;
																	font-style: normal;
																	font-variant: normal;
																	text-decoration: none;
																"
																>Cảm ơn./.</span
															>
														</p>
														<p
															dir="ltr"
															style="
																line-height: 1.656;
																margin-top: 0pt;
																margin-bottom: 0pt;
															">
															<span
																style="
																	color: rgb(0, 0, 0);
																	font-family: 'Google Sans', sans-serif;
																	font-size: 12pt;
																	text-align: justify;
																"
																>–</span
															>
														</p>
														<p
															dir="ltr"
															style="
																line-height: 1.656;
																margin-top: 0pt;
																margin-bottom: 0pt;
															">
															<span
																style="
																	color: rgb(66, 133, 244);
																	font-family: 'Google Sans', sans-serif;
																	font-size: 13pt;
																	font-weight: 700;
																	text-align: justify;
																"
																>Google Developer Student Club</span
															>
														</p>
														<p
															dir="ltr"
															style="
																line-height: 1.656;
																margin-top: 0pt;
																margin-bottom: 0pt;
															">
															<span
																style="
																	color: rgb(85, 85, 85);
																	font-family: 'Google Sans', sans-serif;
																	font-size: 11pt;
																	text-align: justify;
																"
																>Ho Chi Minh City University of Technology</span
															>
														</p>
														<p
															dir="ltr"
															style="
																line-height: 1.656;
																margin-top: 0pt;
																margin-bottom: 0pt;
															">
															<span
																style="
																	text-align: justify;
																	font-variant-numeric: normal;
																	font-variant-east-asian: normal;
																	font-variant-alternates: normal;
																	font-size: 10pt;
																	font-family: 'Google Sans', sans-serif;
																	color: rgb(85, 85, 85);
																	font-weight: 700;
																	font-style: italic;
																"
																>Email:</span
															><span
																style="
																	text-align: justify;
																	font-variant-numeric: normal;
																	font-variant-east-asian: normal;
																	font-variant-alternates: normal;
																	font-size: 10pt;
																	font-family: 'Google Sans', sans-serif;
																	color: rgb(85, 85, 85);
																	font-style: italic;
																"
																>&nbsp;</span
															><span
																style="
																	text-align: justify;
																	font-variant-numeric: normal;
																	font-variant-east-asian: normal;
																	font-variant-alternates: normal;
																	font-size: 10pt;
																	font-family: 'Google Sans', sans-serif;
																	font-style: italic;
																"
																><a
																	href="mailto:contact@gdschcmut.dev"
																	style="color: rgb(17, 85, 204)"
																	target="_blank"
																	>contact@gdschcmut.dev</a
																></span
															>
														</p>
														<p
															dir="ltr"
															style="
																line-height: 1.656;
																margin-top: 0pt;
																margin-bottom: 0pt;
															">
															<span
																style="
																	text-align: justify;
																	font-variant-numeric: normal;
																	font-variant-east-asian: normal;
																	font-variant-alternates: normal;
																	font-size: 10pt;
																	font-family: 'Google Sans', sans-serif;
																	color: rgb(85, 85, 85);
																	font-weight: 700;
																	font-style: italic;
																"
																>Facebook:</span
															><a
																href="https://www.facebook.com/dscxhcmut/"
																hspace="streak-track"
																style="
																	text-align: justify;
																	text-decoration-line: none;
																"
																target="_blank"
																data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/dscxhcmut/&amp;source=gmail&amp;ust=1686937100176000&amp;usg=AOvVaw1v18xRf4iioRBWmgXutrrg"
																><span
																	style="
																		font-size: 10pt;
																		font-family: 'Google Sans', sans-serif;
																		font-weight: 700;
																		font-style: italic;
																		font-variant-numeric: normal;
																		font-variant-east-asian: normal;
																		font-variant-alternates: normal;
																		text-decoration-line: underline;
																	"
																	>&nbsp;</span
																><span
																	style="
																		font-size: 10pt;
																		font-family: 'Google Sans', sans-serif;
																		font-style: italic;
																		font-variant-numeric: normal;
																		font-variant-east-asian: normal;
																		font-variant-alternates: normal;
																		text-decoration-line: underline;

																		color: rgb(17, 85, 204);
																	"
																	>https://www.<wbr />facebook.com/dscxhcmut/</span
																></a
															>
														</p>
														<p
															dir="ltr"
															style="
																line-height: 1.656;
																margin-top: 0pt;
																margin-bottom: 0pt;
															">
															<span
																style="
																	text-align: justify;
																	font-variant-numeric: normal;
																	font-variant-east-asian: normal;
																	font-variant-alternates: normal;
																	font-size: 10pt;
																	font-family: 'Google Sans', sans-serif;
																	color: rgb(85, 85, 85);
																	font-weight: 700;
																	font-style: italic;
																"
																>Address:</span
															><span
																style="
																	text-align: justify;
																	font-variant-numeric: normal;
																	font-variant-east-asian: normal;
																	font-variant-alternates: normal;
																	font-size: 10pt;
																	font-family: 'Google Sans', sans-serif;
																	color: rgb(85, 85, 85);
																	font-style: italic;
																"
																>&nbsp;268 Ly Thuong Kiet, Ward 14, District 10,
																Ho Chi Minh City</span
															>
														</p>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
								<tr>
									<td>
										<table
											border="0"
											width="100%"
											cellspacing="0"
											cellpadding="0">
											<tbody>
												<tr>
													<td
														style="
															background-color: #ffffff;
															border-top: 1px solid #f6f7f9;
															padding: 40px 0 40px;
															font-size: 13px;
															color: #7e8890;
														"
														align="center">
														<a
															href="https://streaklinks.com/BT8hHi6ERIjsu_ZJEAk4wpeN/https%3A%2F%2Fu16161593.ct.sendgrid.net%2Fls%2Fclick%3Fupn%3D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0Lwzg9C4VAJP20noOG84jTS0macmi_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utclyf2jsJXHRWfDwAkctFUwX73MYpmhWoeW8oW3o4G-2BckDWo-2B-2BpTWXVDLrSObETzmtUBODjGL1bz38mFGTyffJb25DGpaEGIiPTR7dq560VdIXaKAEBLq9sVl1-2B-2BRDKL4D0J2OAJTTFSYIs07rHvbIHw-3D-3D"
															target="_blank"
															data-saferedirecturl="https://www.google.com/url?q=https://streaklinks.com/BT8hHi6ERIjsu_ZJEAk4wpeN/https%253A%252F%252Fu16161593.ct.sendgrid.net%252Fls%252Fclick%253Fupn%253D6FylDzOsBjandYrle4FqVZSdv3-2BbZ0ATs1aFPrX0Lwzg9C4VAJP20noOG84jTS0macmi_J2sXdVe2BnhqC3exzESXAmJMuMzjG71v7RSUsMbKve6Ib29LkCTGRRHZ0UZx9utclyf2jsJXHRWfDwAkctFUwX73MYpmhWoeW8oW3o4G-2BckDWo-2B-2BpTWXVDLrSObETzmtUBODjGL1bz38mFGTyffJb25DGpaEGIiPTR7dq560VdIXaKAEBLq9sVl1-2B-2BRDKL4D0J2OAJTTFSYIs07rHvbIHw-3D-3D&amp;source=gmail&amp;ust=1686937100176000&amp;usg=AOvVaw0uMga89tcjZ5JwDAWVeCIn"
															><img
																src="https://ci3.googleusercontent.com/proxy/1r-2vzVLcsXOpbFMuS1z_1wAHilkgE7VFmSK2du-iSEE9y_IDtifkp_7W6Tl0I8cWPm-LpQkJJjwV-MWuUOCR9f8ODWCK6t1yzb40sb10EICj67F2A3ZaCIPBmtk9CdzZCBQ65LpsCExriQv8CzuM_4vxPC8UCV_Q6zlmJ5gj3hTZ7ObfIF2nkBXNKBsxB_o8mlvE0HvKyviDRH3jOdMhZUE6f84W3J0mPP3uMuxWfT3vmV9IRKqPAQoC5WlegZTQnruwsQq3A=s0-d-e1-ft#https://res.cloudinary.com/startup-grind/image/upload/c_fit,dpr_2.0,f_auto,g_center,h_60,q_auto:good,w_500/v1/gcs/platform-data-dsc/contentbuilder/logo_dark_horizontal_WVttpzD.png"
																alt=""
																height="30"
																border="0"
														/></a>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
			</tbody>
		</table>
		<img
			style="
				height: 1px !important;
				width: 1px !important;
				border-width: 0 !important;
				padding: 0 !important;
				margin: 0 !important;
			"
			src="https://ci5.googleusercontent.com/proxy/TM6Pu1jLMfEZO_Tw9fwBSCQg-_Pi4GoWDRH35_cS3oyS5zEJY192JqakvAo1DhL-as5PJ4a6vXaGyc_RBmzAEefu_kEfQ-XVEkQdQyj7H1VrlFa69UU1OjU3_Nq59DjkomUOP8_HQ97JUvlJbMESxO44jsyhXKtDA5jqHp8nRcpNnT1B131kO5lyHPulNQAstGE4pzXGdMBFepwi7Ad_axpSVr6y0jKa1xQzBHoVFIAnSsT0hMIpgUdty2J68SHBvBw9vjZHvbqMNTIaVYPTEHITn5lzsWxlDmXnw3eRc7VG14OFYq_Yijz686eSRqmntwBjI-247ST5KR8mD3v1d0xvJEWIgzCDz3ulJCHPYJaYu3TTRcKeyak4C856HHnEaC3RSa0iRt0UgUUz7zGVufO6bzg8yMqiS5I=s0-d-e1-ft#https://u16161593.ct.sendgrid.net/wf/open?upn=f9BVIBTE4MV61d5WjyC1xRBeR2D0-2FN201XFXTlyGhGyQgyHSETzPOsJgbL-2B6iWKcS5VFV0WSwLBEXJd1jcrJJuKwQm68GVMxsvpPG6KQ1MJzOJFj03Z-2FRqTFChIYweOcYW9QeGejF3u-2F9B11dZqzfjxleppWee-2FQ7IDcefEpxjuVE12hEsfPoZJNwF1utRzsCPvDW4FPYrxy3On5PFdlWE7kzdkn5ZSFwW1Pu2CyJj4-3D"
			alt=""
			width="1"
			height="1"
			border="0" />
	</div>
</div>

    `
}

export function IDEA_SHOWCASE_1_DAY_REMINDER_EMAIL(
    receiver: string
) {
    return `
    <div dir="ltr">
	<span
		id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416m_-7359242913170741097m_6959869984178767616m_-5204224724223243460m_8547990654564590607m_-4950256737232121122m_-8855140196745707954m_1571738345138465560m_-7245619203027857574m_-8587399173516265924m_1807733634597748691m_2630983951910396064m_-8874052193673562173m_-5572269842676354713m_-1135207554348494915m_6292912265874281824m_-238922540227333448m_-6226199907652576094m_-2106880031808774276m_8270289340422095026m_-1121791470051374188m_237812766724536027m_880577506136178920m_-1934161694756813377m_-7594954503336563888m_-2568508069012915182m_4624988801002304115m_-3156134251510025338m_6316518805007134942m_-33009856506600168m_-8109249209287040672gmail-docs-internal-guid-8ae7ed1c-7fff-1077-63f5-e6345498190e"
		><div dir="ltr" style="margin-left: 0pt" align="center">
			<table style="border: none; border-collapse: collapse">
				<colgroup>
					<col width="697" />
				</colgroup>
				<tbody>
					<tr>
						<td style="vertical-align: top; overflow: hidden">
							<p
								dir="ltr"
								style="line-height: 1.2; margin-top: 0pt; margin-bottom: 0pt">
								<span
									style="
										font-size: 11pt;
										font-family: 'Google Sans', sans-serif;
										color: rgb(32, 33, 36);
										background-color: transparent;
										font-variant-numeric: normal;
										font-variant-east-asian: normal;
										font-variant-alternates: normal;
									"
									><span
										style="
											border: none;
											display: inline-block;
											overflow: hidden;
											width: 698px;
											height: 237px;
										"
										><img
											src="https://lh3.googleusercontent.com/drive-viewer/AFGJ81oBexBUkKU7FIVY_c3gOkN5KKr-lYSzp8mYkCz5zQj5GoSZ-sR4LKduSnINaulWm6ozLXF49UbUMRec2hGFxAVhkscVsQ=w1920-h961"
											alt="image.png"
											width="699"
											height="237"
											style="margin-right: 0px"
											data-image-whitelisted=""
											class="CToWUd a6T"
											data-bit="iit"
											tabindex="0" /> </span
								></span>
							</p>
							<div
								class="a6S"
								dir="ltr"
								style="opacity: 0.01; left: 652.484px; top: 199px">
								<div
									id=":1v6"
									class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q"
									role="button"
									tabindex="0"
									aria-label="Download attachment image.png"
									jslog="91252; u014N:cOuCgd,Kr2w4b,xr6bB; 4:WyIjbXNnLWE6ci00NjQyMTEyMjgxMTE2MTQwNTc4IixudWxsLFtdXQ.."
									data-tooltip-class="a1V"
									data-tooltip="Download">
									<div class="akn">
										<div class="aSK J-J5-Ji aYr"></div>
									</div>
								</div>
								<div
									id=":1v7"
									class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q"
									role="button"
									tabindex="0"
									aria-label="Add attachment to Drive image.png"
									jslog="54185; u014N:cOuCgd,xr6bB; 1:WyIjdGhyZWFkLWE6ci00NjUwMzc0Njk3MTk5NTYxMjE4IixudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxbXV0.; 4:WyIjbXNnLWE6ci00NjQyMTEyMjgxMTE2MTQwNTc4IixudWxsLFtdXQ..; 43:WyJpbWFnZS9wbmciLDQxMTA5Ml0."
									data-tooltip-class="a1V"
									data-tooltip="Add to Drive">
									<div class="akn">
										<div class="wtScjd J-J5-Ji aYr XG">
											<div class="T-aT4" style="display: none">
												<div></div>
												<div class="T-aT4-JX"></div>
											</div>
										</div>
									</div>
								</div>
								<div
									id=":1v9"
									class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q"
									role="button"
									tabindex="0"
									aria-label="Save a copy to Photos"
									jslog="54186; u014N:cOuCgd,xr6bB; 1:WyIjdGhyZWFkLWE6ci00NjUwMzc0Njk3MTk5NTYxMjE4IixudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxbXV0.; 4:WyIjbXNnLWE6ci00NjQyMTEyMjgxMTE2MTQwNTc4IixudWxsLFtdXQ..; 43:WyJpbWFnZS9wbmciLDQxMTA5Ml0."
									data-tooltip-class="a1V"
									data-tooltip="Save a copy to Photos">
									<div class="akn">
										<div class="J-J5-Ji aYr akS">
											<div class="T-aT4" style="display: none">
												<div></div>
												<div class="T-aT4-JX"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<p></p>
							<div dir="ltr" style="opacity: 0.01">
								<div
									id="m_-2761030115794188056:115"
									role="button"
									aria-label="Download attachment image.png">
									<div><div></div></div>
								</div>
								<div
									id="m_-2761030115794188056:116"
									role="button"
									aria-label="Add attachment to Drive image.png">
									<div>
										<div>
											<div style="display: none">
												<div></div>
												<div></div>
											</div>
										</div>
									</div>
								</div>
								<div
									id="m_-2761030115794188056:118"
									role="button"
									aria-label="Save a copy to Photos">
									<div>
										<div>
											<div style="display: none">
												<div></div>
												<div></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<p></p>
							<div dir="ltr" style="opacity: 0.01">
								<div
									id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416:1ak"
									role="button"
									aria-label="Download attachment image.png">
									<div><div></div></div>
								</div>
								<div
									id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416:1al"
									role="button"
									aria-label="Add attachment to Drive image.png">
									<div>
										<div>
											<div style="display: none">
												<div></div>
												<div></div>
											</div>
										</div>
									</div>
								</div>
								<div
									id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416:1an"
									role="button"
									aria-label="Save a copy to Photos">
									<div>
										<div>
											<div style="display: none">
												<div></div>
												<div></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<p></p>
							<div dir="ltr" style="opacity: 0.01">
								<div
									id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416m_-7359242913170741097m_6959869984178767616m_-5204224724223243460:64l"
									role="button"
									aria-label="Download attachment image.png">
									<div><div></div></div>
								</div>
								<div
									id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416m_-7359242913170741097m_6959869984178767616m_-5204224724223243460:64m"
									role="button"
									aria-label="Add attachment to Drive image.png">
									<div>
										<div>
											<div style="display: none">
												<div></div>
												<div></div>
											</div>
										</div>
									</div>
								</div>
								<div
									id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416m_-7359242913170741097m_6959869984178767616m_-5204224724223243460:64o"
									role="button"
									aria-label="Save a copy to Photos">
									<div>
										<div>
											<div style="display: none">
												<div></div>
												<div></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<p></p>
							<div dir="ltr" style="opacity: 0.01">
								<div
									id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416m_-7359242913170741097m_6959869984178767616m_-5204224724223243460m_8547990654564590607m_-4950256737232121122m_-8855140196745707954:1bk"
									role="button"
									aria-label="Download attachment image.png">
									<div><div></div></div>
								</div>
								<div
									id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416m_-7359242913170741097m_6959869984178767616m_-5204224724223243460m_8547990654564590607m_-4950256737232121122m_-8855140196745707954:1bl"
									role="button"
									aria-label="Add attachment to Drive image.png">
									<div>
										<div>
											<div style="display: none">
												<div></div>
												<div></div>
											</div>
										</div>
									</div>
								</div>
								<div
									id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416m_-7359242913170741097m_6959869984178767616m_-5204224724223243460m_8547990654564590607m_-4950256737232121122m_-8855140196745707954:1bn"
									role="button"
									aria-label="Save a copy to Photos">
									<div>
										<div>
											<div style="display: none">
												<div></div>
												<div></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<p></p>
							<div dir="ltr" style="opacity: 0.01">
								<div
									id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416m_-7359242913170741097m_6959869984178767616m_-5204224724223243460m_8547990654564590607m_-4950256737232121122m_-8855140196745707954m_1571738345138465560m_-7245619203027857574m_-8587399173516265924:1ml"
									role="button"
									aria-label="Download attachment image.png">
									<div><div></div></div>
								</div>
								<div
									id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416m_-7359242913170741097m_6959869984178767616m_-5204224724223243460m_8547990654564590607m_-4950256737232121122m_-8855140196745707954m_1571738345138465560m_-7245619203027857574m_-8587399173516265924:1mm"
									role="button"
									aria-label="Add attachment to Drive image.png">
									<div>
										<div>
											<div style="display: none">
												<div></div>
												<div></div>
											</div>
										</div>
									</div>
								</div>
								<div
									id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416m_-7359242913170741097m_6959869984178767616m_-5204224724223243460m_8547990654564590607m_-4950256737232121122m_-8855140196745707954m_1571738345138465560m_-7245619203027857574m_-8587399173516265924:1mo"
									role="button"
									aria-label="Save a copy to Photos">
									<div>
										<div>
											<div style="display: none">
												<div></div>
												<div></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<p></p>
							<div dir="ltr" style="opacity: 0.01">
								<div
									id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416m_-7359242913170741097m_6959869984178767616m_-5204224724223243460m_8547990654564590607m_-4950256737232121122m_-8855140196745707954m_1571738345138465560m_-7245619203027857574m_-8587399173516265924m_1807733634597748691m_2630983951910396064:az2"
									role="button"
									aria-label="Download attachment image.png">
									<div><div></div></div>
								</div>
								<div
									id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416m_-7359242913170741097m_6959869984178767616m_-5204224724223243460m_8547990654564590607m_-4950256737232121122m_-8855140196745707954m_1571738345138465560m_-7245619203027857574m_-8587399173516265924m_1807733634597748691m_2630983951910396064:az3"
									role="button"
									aria-label="Add attachment to Drive image.png">
									<div>
										<div>
											<div style="display: none">
												<div></div>
												<div></div>
											</div>
										</div>
									</div>
								</div>
								<div
									id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416m_-7359242913170741097m_6959869984178767616m_-5204224724223243460m_8547990654564590607m_-4950256737232121122m_-8855140196745707954m_1571738345138465560m_-7245619203027857574m_-8587399173516265924m_1807733634597748691m_2630983951910396064:az5"
									role="button"
									aria-label="Save a copy to Photos">
									<div>
										<div>
											<div style="display: none">
												<div></div>
												<div></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<p></p>
							<div dir="ltr" style="opacity: 0.01">
								<div
									id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416m_-7359242913170741097m_6959869984178767616m_-5204224724223243460m_8547990654564590607m_-4950256737232121122m_-8855140196745707954m_1571738345138465560m_-7245619203027857574m_-8587399173516265924m_1807733634597748691m_2630983951910396064m_-8874052193673562173m_-5572269842676354713:2kw"
									role="button"
									aria-label="Download attachment image.png">
									<div><div></div></div>
								</div>
								<div
									id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416m_-7359242913170741097m_6959869984178767616m_-5204224724223243460m_8547990654564590607m_-4950256737232121122m_-8855140196745707954m_1571738345138465560m_-7245619203027857574m_-8587399173516265924m_1807733634597748691m_2630983951910396064m_-8874052193673562173m_-5572269842676354713:2kx"
									role="button"
									aria-label="Add attachment to Drive image.png">
									<div>
										<div>
											<div style="display: none">
												<div></div>
												<div></div>
											</div>
										</div>
									</div>
								</div>
								<div
									id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416m_-7359242913170741097m_6959869984178767616m_-5204224724223243460m_8547990654564590607m_-4950256737232121122m_-8855140196745707954m_1571738345138465560m_-7245619203027857574m_-8587399173516265924m_1807733634597748691m_2630983951910396064m_-8874052193673562173m_-5572269842676354713:2kz"
									role="button"
									aria-label="Save a copy to Photos">
									<div>
										<div>
											<div style="display: none">
												<div></div>
												<div></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<p></p>
							<div dir="ltr" style="opacity: 0.01">
								<div
									id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416m_-7359242913170741097m_6959869984178767616m_-5204224724223243460m_8547990654564590607m_-4950256737232121122m_-8855140196745707954m_1571738345138465560m_-7245619203027857574m_-8587399173516265924m_1807733634597748691m_2630983951910396064m_-8874052193673562173m_-5572269842676354713m_-1135207554348494915m_6292912265874281824:aq8"
									role="button"
									aria-label="Download attachment image.png">
									<div><div></div></div>
								</div>
								<div
									id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416m_-7359242913170741097m_6959869984178767616m_-5204224724223243460m_8547990654564590607m_-4950256737232121122m_-8855140196745707954m_1571738345138465560m_-7245619203027857574m_-8587399173516265924m_1807733634597748691m_2630983951910396064m_-8874052193673562173m_-5572269842676354713m_-1135207554348494915m_6292912265874281824:aq9"
									role="button"
									aria-label="Add attachment to Drive image.png">
									<div>
										<div>
											<div style="display: none">
												<div></div>
												<div></div>
											</div>
										</div>
									</div>
								</div>
								<div
									id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416m_-7359242913170741097m_6959869984178767616m_-5204224724223243460m_8547990654564590607m_-4950256737232121122m_-8855140196745707954m_1571738345138465560m_-7245619203027857574m_-8587399173516265924m_1807733634597748691m_2630983951910396064m_-8874052193673562173m_-5572269842676354713m_-1135207554348494915m_6292912265874281824:aqb"
									role="button"
									aria-label="Save a copy to Photos">
									<div>
										<div>
											<div style="display: none">
												<div></div>
												<div></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<p></p>
							<div dir="ltr" style="opacity: 0.01">
								<div
									id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416m_-7359242913170741097m_6959869984178767616m_-5204224724223243460m_8547990654564590607m_-4950256737232121122m_-8855140196745707954m_1571738345138465560m_-7245619203027857574m_-8587399173516265924m_1807733634597748691m_2630983951910396064m_-8874052193673562173m_-5572269842676354713m_-1135207554348494915m_6292912265874281824m_-238922540227333448:2jt"
									role="button"
									aria-label="Download attachment image.png">
									<div><div></div></div>
								</div>
								<div
									id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416m_-7359242913170741097m_6959869984178767616m_-5204224724223243460m_8547990654564590607m_-4950256737232121122m_-8855140196745707954m_1571738345138465560m_-7245619203027857574m_-8587399173516265924m_1807733634597748691m_2630983951910396064m_-8874052193673562173m_-5572269842676354713m_-1135207554348494915m_6292912265874281824m_-238922540227333448:2ju"
									role="button"
									aria-label="Add attachment to Drive image.png">
									<div>
										<div>
											<div style="display: none">
												<div></div>
												<div></div>
											</div>
										</div>
									</div>
								</div>
								<div
									id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416m_-7359242913170741097m_6959869984178767616m_-5204224724223243460m_8547990654564590607m_-4950256737232121122m_-8855140196745707954m_1571738345138465560m_-7245619203027857574m_-8587399173516265924m_1807733634597748691m_2630983951910396064m_-8874052193673562173m_-5572269842676354713m_-1135207554348494915m_6292912265874281824m_-238922540227333448:2jw"
									role="button"
									aria-label="Save a copy to Photos">
									<div>
										<div>
											<div style="display: none">
												<div></div>
												<div></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<p></p>
							<div dir="ltr" style="opacity: 0.01">
								<div
									id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416m_-7359242913170741097m_6959869984178767616m_-5204224724223243460m_8547990654564590607m_-4950256737232121122m_-8855140196745707954m_1571738345138465560m_-7245619203027857574m_-8587399173516265924m_1807733634597748691m_2630983951910396064m_-8874052193673562173m_-5572269842676354713m_-1135207554348494915m_6292912265874281824m_-238922540227333448m_-6226199907652576094m_-2106880031808774276m_8270289340422095026:ula"
									role="button"
									aria-label="Download attachment image.png">
									<div><div></div></div>
								</div>
								<div
									id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416m_-7359242913170741097m_6959869984178767616m_-5204224724223243460m_8547990654564590607m_-4950256737232121122m_-8855140196745707954m_1571738345138465560m_-7245619203027857574m_-8587399173516265924m_1807733634597748691m_2630983951910396064m_-8874052193673562173m_-5572269842676354713m_-1135207554348494915m_6292912265874281824m_-238922540227333448m_-6226199907652576094m_-2106880031808774276m_8270289340422095026:ulb"
									role="button"
									aria-label="Add attachment to Drive image.png">
									<div>
										<div>
											<div style="display: none">
												<div></div>
												<div></div>
											</div>
										</div>
									</div>
								</div>
								<div
									id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416m_-7359242913170741097m_6959869984178767616m_-5204224724223243460m_8547990654564590607m_-4950256737232121122m_-8855140196745707954m_1571738345138465560m_-7245619203027857574m_-8587399173516265924m_1807733634597748691m_2630983951910396064m_-8874052193673562173m_-5572269842676354713m_-1135207554348494915m_6292912265874281824m_-238922540227333448m_-6226199907652576094m_-2106880031808774276m_8270289340422095026:uld"
									role="button"
									aria-label="Save a copy to Photos">
									<div>
										<div>
											<div style="display: none">
												<div></div>
												<div></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<p></p>
							<div dir="ltr" style="opacity: 0.01">
								<div
									id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416m_-7359242913170741097m_6959869984178767616m_-5204224724223243460m_8547990654564590607m_-4950256737232121122m_-8855140196745707954m_1571738345138465560m_-7245619203027857574m_-8587399173516265924m_1807733634597748691m_2630983951910396064m_-8874052193673562173m_-5572269842676354713m_-1135207554348494915m_6292912265874281824m_-238922540227333448m_-6226199907652576094m_-2106880031808774276m_8270289340422095026m_-1121791470051374188m_237812766724536027m_880577506136178920:2qc"
									role="button"
									aria-label="Download attachment image.png">
									<div><div></div></div>
								</div>
								<div
									id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416m_-7359242913170741097m_6959869984178767616m_-5204224724223243460m_8547990654564590607m_-4950256737232121122m_-8855140196745707954m_1571738345138465560m_-7245619203027857574m_-8587399173516265924m_1807733634597748691m_2630983951910396064m_-8874052193673562173m_-5572269842676354713m_-1135207554348494915m_6292912265874281824m_-238922540227333448m_-6226199907652576094m_-2106880031808774276m_8270289340422095026m_-1121791470051374188m_237812766724536027m_880577506136178920:2qd"
									role="button"
									aria-label="Add attachment to Drive image.png">
									<div>
										<div>
											<div style="display: none">
												<div></div>
												<div></div>
											</div>
										</div>
									</div>
								</div>
								<div
									id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416m_-7359242913170741097m_6959869984178767616m_-5204224724223243460m_8547990654564590607m_-4950256737232121122m_-8855140196745707954m_1571738345138465560m_-7245619203027857574m_-8587399173516265924m_1807733634597748691m_2630983951910396064m_-8874052193673562173m_-5572269842676354713m_-1135207554348494915m_6292912265874281824m_-238922540227333448m_-6226199907652576094m_-2106880031808774276m_8270289340422095026m_-1121791470051374188m_237812766724536027m_880577506136178920:2qf"
									role="button"
									aria-label="Save a copy to Photos">
									<div>
										<div>
											<div style="display: none">
												<div></div>
												<div></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<p></p>
							<div dir="ltr" style="opacity: 0.01">
								<div
									id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416m_-7359242913170741097m_6959869984178767616m_-5204224724223243460m_8547990654564590607m_-4950256737232121122m_-8855140196745707954m_1571738345138465560m_-7245619203027857574m_-8587399173516265924m_1807733634597748691m_2630983951910396064m_-8874052193673562173m_-5572269842676354713m_-1135207554348494915m_6292912265874281824m_-238922540227333448m_-6226199907652576094m_-2106880031808774276m_8270289340422095026m_-1121791470051374188m_237812766724536027m_880577506136178920m_-1934161694756813377m_-7594954503336563888m_-2568508069012915182m_4624988801002304115m_-3156134251510025338:69u"
									role="button"
									aria-label="Download attachment image.png">
									<div><div></div></div>
								</div>
								<div
									id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416m_-7359242913170741097m_6959869984178767616m_-5204224724223243460m_8547990654564590607m_-4950256737232121122m_-8855140196745707954m_1571738345138465560m_-7245619203027857574m_-8587399173516265924m_1807733634597748691m_2630983951910396064m_-8874052193673562173m_-5572269842676354713m_-1135207554348494915m_6292912265874281824m_-238922540227333448m_-6226199907652576094m_-2106880031808774276m_8270289340422095026m_-1121791470051374188m_237812766724536027m_880577506136178920m_-1934161694756813377m_-7594954503336563888m_-2568508069012915182m_4624988801002304115m_-3156134251510025338:69v"
									role="button"
									aria-label="Add attachment to Drive image.png">
									<div>
										<div>
											<div style="display: none">
												<div></div>
												<div></div>
											</div>
										</div>
									</div>
								</div>
								<div
									id="m_-2761030115794188056m_7158573559926132776m_-5135839580185802412m_8453455423576646228m_-4836034643749245000m_-2866088130077848574m_5651059891311247382m_-6678611498037982416m_-7359242913170741097m_6959869984178767616m_-5204224724223243460m_8547990654564590607m_-4950256737232121122m_-8855140196745707954m_1571738345138465560m_-7245619203027857574m_-8587399173516265924m_1807733634597748691m_2630983951910396064m_-8874052193673562173m_-5572269842676354713m_-1135207554348494915m_6292912265874281824m_-238922540227333448m_-6226199907652576094m_-2106880031808774276m_8270289340422095026m_-1121791470051374188m_237812766724536027m_880577506136178920m_-1934161694756813377m_-7594954503336563888m_-2568508069012915182m_4624988801002304115m_-3156134251510025338:69x"
									role="button"
									aria-label="Save a copy to Photos">
									<div>
										<div>
											<div style="display: none">
												<div></div>
												<div></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<p></p>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<br />
		<div dir="ltr" style="margin-left: 0pt" align="center">
			<table style="border: none; border-collapse: collapse">
				<colgroup>
					<col width="697" />
				</colgroup>
				<tbody>
					<tr style="height: 0pt">
						<td
							style="
								vertical-align: top;
								background-color: rgb(243, 243, 243);
								padding: 72pt;
								padding-bottom: 36pt;
								overflow: hidden;
							">
							<p
								dir="ltr"
								style="
									line-height: 2.16;
									text-align: justify;
									margin-top: 0pt;
									margin-bottom: 0pt;
									padding: 0pt 0pt 10pt;
								">
								<span
									style="
										font-size: 12pt;
										font-family: Arial;
										color: rgb(0, 0, 0);
										background-color: transparent;
										font-weight: 400;
										font-style: normal;
										font-variant: normal;
										text-decoration: none;
									"
									>Xin chào </span
								><span
									style="
										font-size: 12pt;
										font-family: Arial;
										color: rgb(0, 0, 0);
										background-color: transparent;
										font-weight: 700;
										font-style: normal;
										font-variant: normal;
										text-decoration: none;
									"
									>${receiver}</span
								><span
									style="
										font-size: 12pt;
										font-family: Arial;
										color: rgb(0, 0, 0);
										background-color: transparent;
										font-weight: 400;
										font-style: normal;
										font-variant: normal;
										text-decoration: none;
									"
									>,</span
								>
							</p>
							<p
								dir="ltr"
								style="
									line-height: 2.16;
									text-align: justify;
									margin-top: 0pt;
									margin-bottom: 0pt;
									padding: 0pt 0pt 10pt;
								">
								<span
									style="
										font-size: 12pt;
										font-family: Arial;
										color: rgb(0, 0, 0);
										background-color: transparent;
										font-weight: 400;
										font-style: normal;
										font-variant: normal;
										text-decoration: none;
									"
									>Sự kiện </span
								><span
									style="
										font-size: 12pt;
										font-family: Arial;
										color: rgb(0, 0, 0);
										background-color: transparent;
										font-weight: 700;
										font-style: normal;
										font-variant: normal;
										text-decoration: none;
									"
									>GIC 2023: Idea Showcase</span
								><span
									style="
										font-size: 12pt;
										font-family: Arial;
										color: rgb(0, 0, 0);
										background-color: transparent;
										font-weight: 400;
										font-style: normal;
										font-variant: normal;
										text-decoration: none;
									">
									đang rất gần kề, ban tổ chức </span
								><span
									style="
										font-size: 12pt;
										font-family: Arial;
										color: rgb(0, 0, 0);
										background-color: transparent;
										font-weight: 700;
										font-style: normal;
										font-variant: normal;
										text-decoration: none;
									"
									>GDSC Idea Contest 2023: THiNK</span
								><span
									style="
										font-size: 12pt;
										font-family: Arial;
										color: rgb(0, 0, 0);
										background-color: transparent;
										font-weight: 400;
										font-style: normal;
										font-variant: normal;
										text-decoration: none;
									">
									chân thành cảm ơn bạn đã đăng ký tham gia sự kiện. Những đội
									thi đang dần lộ diện, những ý tưởng đột phá và những giải pháp
									đang chờ được trình bày. Còn chần chờ gì nữa mà không chuẩn bị
									tham gia sự kiện!</span
								>
							</p>
							<p
								dir="ltr"
								style="
									line-height: 2.16;
									text-align: justify;
									margin-top: 0pt;
									margin-bottom: 10pt;
								">
								<span
									style="
										font-size: 12pt;
										font-family: Arial;
										color: rgb(0, 0, 0);
										background-color: transparent;
										font-weight: 700;
										font-style: normal;
										font-variant: normal;
										text-decoration: none;
									"
									>GIC 2023: Idea Showcase:</span
								>
							</p>
							<ul
								style="
									margin-top: 0px;
									margin-bottom: 0px;
									padding-inline-start: 48px;
								">
								<li
									dir="ltr"
									style="
										list-style-type: disc;
										font-size: 12pt;
										font-family: Arial;
										color: rgb(0, 0, 0);
										background-color: transparent;
										font-weight: 400;
										font-style: normal;
										font-variant: normal;
										text-decoration: none;
									">
									<p
										dir="ltr"
										style="
											line-height: 1.8;
											margin-top: 0pt;
											margin-bottom: 0pt;
										"
										role="presentation">
										<span
											style="
												font-size: 12pt;
												font-family: Arial;
												color: rgb(0, 0, 0);
												background-color: transparent;
												font-weight: 700;
												font-style: normal;
												font-variant: normal;
												text-decoration: none;
											"
											>Thời gian</span
										><span
											style="
												font-size: 12pt;
												font-family: Arial;
												color: rgb(0, 0, 0);
												background-color: transparent;
												font-weight: 400;
												font-style: normal;
												font-variant: normal;
												text-decoration: none;
											"
											>: 08:00 - 12:15 ngày 25/06/2023</span
										>
									</p>
								</li>
								<li
									dir="ltr"
									style="
										list-style-type: disc;
										font-size: 12pt;
										font-family: Arial;
										color: rgb(0, 0, 0);
										background-color: transparent;
										font-weight: 400;
										font-style: normal;
										font-variant: normal;
										text-decoration: none;
									">
									<p
										dir="ltr"
										style="
											line-height: 1.8;
											margin-top: 0pt;
											margin-bottom: 0pt;
										"
										role="presentation">
										<span
											style="
												font-size: 12pt;
												font-family: Arial;
												color: rgb(0, 0, 0);
												background-color: transparent;
												font-weight: 700;
												font-style: normal;
												font-variant: normal;
												text-decoration: none;
											"
											>Địa điểm:</span
										><span
											style="
												font-size: 12pt;
												font-family: Arial;
												color: rgb(0, 0, 0);
												background-color: transparent;
												font-weight: 400;
												font-style: normal;
												font-variant: normal;
												text-decoration: none;
											">
											Nhà văn hóa sinh viên Đại học Quốc gia TP.HCM - đường
											Quảng Trường Sáng Tạo, phường Đông Hòa, thành phố Dĩ An,
											tỉnh Bình Dương (</span
										><a
											href="https://drive.google.com/file/d/1ovIf9PFC-m461edzGZXCe0qEv4ATTrkv/view?usp=sharing"
											style="text-decoration: none"
											hspace="streak-track"
											><span
												style="
													font-size: 12pt;
													font-family: Arial;
													color: rgb(17, 85, 204);
													background-color: transparent;
													font-weight: 400;
													font-style: normal;
													font-variant: normal;
													text-decoration: underline;
													text-decoration-skip-ink: none;
												"
												>sơ đồ nhà văn
												<span
													zeum4c14="PR_6_0"
													data-ddnwab="PR_6_0"
													aria-invalid="spelling"
													class="LI ng"
													>hoá</span
												>
												sinh viên</span
											></a
										><span
											style="
												font-size: 12pt;
												font-family: Arial;
												color: rgb(0, 0, 0);
												background-color: transparent;
												font-weight: 400;
												font-style: normal;
												font-variant: normal;
												text-decoration: none;
											"
											>)</span
										>
									</p>
								</li>
							</ul>
							<p
								dir="ltr"
								style="
									line-height: 2.16;
									text-align: justify;
									margin-top: 0pt;
									margin-bottom: 10pt;
								">
								<span
									style="
										font-size: 12pt;
										font-family: Arial;
										color: rgb(0, 0, 0);
										background-color: transparent;
										font-weight: 400;
										font-style: normal;
										font-variant: normal;
										text-decoration: none;
									"
									>Ngoài ra, thông tin chi tiết và những sự kiện trong chuỗi
									cuộc thi </span
								><span
									style="
										font-size: 12pt;
										font-family: Arial;
										color: rgb(0, 0, 0);
										background-color: transparent;
										font-weight: 700;
										font-style: normal;
										font-variant: normal;
										text-decoration: none;
									"
									>GDSC Idea Contest 2023: THiNK</span
								><span
									style="
										font-size: 12pt;
										font-family: Arial;
										color: rgb(0, 0, 0);
										background-color: transparent;
										font-weight: 400;
										font-style: normal;
										font-variant: normal;
										text-decoration: none;
									">
									đã được đăng tải tại website cuộc thi </span
								><a
									href="http://gdsc.app/"
									style="text-decoration: none"
									hspace="streak-track"
									><span
										style="
											font-size: 12pt;
											font-family: Arial;
											color: rgb(17, 85, 204);
											background-color: transparent;
											font-weight: 400;
											font-style: normal;
											font-variant: normal;
											text-decoration: underline;
											text-decoration-skip-ink: none;
											vertical-align: baseline;
											white-space: pre-wrap;
										"
										>gdsc.app</span
									></a
								><span
									style="
										font-size: 12pt;
										font-family: Arial;
										color: rgb(0, 0, 0);
										background-color: transparent;
										font-weight: 400;
										font-style: normal;
										font-variant: normal;
										text-decoration: none;
									"
									>. Bạn có thể xem thêm nhé!</span
								>
							</p>
							<p
								dir="ltr"
								style="
									line-height: 1.8;
									text-align: justify;
									margin-top: 0pt;
									margin-bottom: 10pt;
								">
								<span
									style="
										font-size: 12pt;
										font-family: Arial;
										color: rgb(0, 0, 0);
										background-color: transparent;
										font-weight: 400;
										font-style: normal;
										font-variant: normal;
										text-decoration: none;
									"
									>Ngoài ra, thông tin chi tiết và những sự kiện trong chuỗi
									cuộc thi </span
								><span
									style="
										font-size: 12pt;
										font-family: Arial;
										color: rgb(0, 0, 0);
										background-color: transparent;
										font-weight: 700;
										font-style: normal;
										font-variant: normal;
										text-decoration: none;
									"
									>GDSC Idea Contest 2023: THiNK</span
								><span
									style="
										font-size: 12pt;
										font-family: Arial;
										color: rgb(0, 0, 0);
										background-color: transparent;
										font-weight: 400;
										font-style: normal;
										font-variant: normal;
										text-decoration: none;
									">
									đã được đăng tải tại website cuộc thi
									<a
										href="http://gdsc.app"
										target="_blank"
										data-saferedirecturl="https://www.google.com/url?q=http://gdsc.app&amp;source=gmail&amp;ust=1687683349196000&amp;usg=AOvVaw0npazauUXmt_AFZ5wecIsP"
										hspace="streak-track"
										>gdsc.app</a
									>. Bạn có thể xem thêm nhé!</span
								>
							</p>
							<p
								dir="ltr"
								style="
									line-height: 1.8;
									text-align: center;
									margin-top: 0pt;
									margin-bottom: 10pt;
								">
								<a
									href="https://streaklinks.com/Bjpa0PrxMU27lQNamQT-Uk6h/https%3A%2F%2Fgdsc.app%2Fevent%2Fidea-showcase"
									style="
										display: block;
										padding: 0.75rem 1.25rem;
										border-radius: 0.5rem;
										color: rgb(255, 255, 255);
										text-transform: uppercase;
										font-size: 1rem;
										text-decoration-line: none;
										background-color: rgba(232, 99, 87, 0.906);
										margin: 0.5rem auto;
										width: fit-content;
										font-family: Arial, sans-serif;
									"
									target="_blank"
									data-saferedirecturl="https://www.google.com/url?q=https://streaklinks.com/Bjpa0PrxMU27lQNamQT-Uk6h/https%253A%252F%252Fgdsc.app%252Fevent%252Fidea-showcase&amp;source=gmail&amp;ust=1687683349196000&amp;usg=AOvVaw3QcmkL0usRycaNDxhRj6Qx"
									hspace="streak-track"
									><b>GIC 2023: Idea Showcase</b></a
								>
							</p>
							<p
								dir="ltr"
								style="
									line-height: 1.8;
									text-align: justify;
									margin-top: 0pt;
									margin-bottom: 10pt;
								">
								<span
									style="
										font-size: 12pt;
										font-family: Arial;
										color: rgb(0, 0, 0);
										background-color: transparent;
										font-weight: 400;
										font-style: normal;
										font-variant: normal;
										text-decoration: none;
									"
									>Đặc biệt trong sự kiện, ban tổ chức chúng mình sẽ còn có thêm
									nhiều phần quà thú vị cho các bạn tham gia thêm vào đó là
									những gian hàng hết sức thú vị từ nhà tài trợ </span
								><span
									style="
										font-size: 12pt;
										font-family: Arial;
										color: rgb(0, 0, 0);
										background-color: transparent;
										font-weight: 700;
										font-style: normal;
										font-variant: normal;
										text-decoration: none;
									"
									>BEAMIN Tech</span
								><span
									style="
										font-size: 12pt;
										font-family: Arial;
										color: rgb(0, 0, 0);
										background-color: transparent;
										font-weight: 400;
										font-style: normal;
										font-variant: normal;
										text-decoration: none;
									"
									>, đừng lỡ hẹn bạn nhé!</span
								>
							</p>
							<p
								dir="ltr"
								style="
									line-height: 1.8;
									text-align: justify;
									margin-top: 0pt;
									margin-bottom: 10pt;
								">
								<span
									style="
										font-size: 12pt;
										font-family: Arial;
										color: rgb(0, 0, 0);
										background-color: transparent;
										font-weight: 400;
										font-style: normal;
										font-variant: normal;
										text-decoration: none;
									"
									>Hẹn gặp bạn ở ngày chung kết.</span
								>
							</p>
							<p
								dir="ltr"
								style="
									line-height: 1.8;
									text-align: justify;
									margin-top: 0pt;
									margin-bottom: 10pt;
								">
								<span
									style="
										font-size: 12pt;
										font-family: Arial;
										color: rgb(0, 0, 0);
										background-color: transparent;
										font-weight: 400;
										font-style: normal;
										font-variant: normal;
										text-decoration: none;
									"
									>Cảm ơn./.</span
								>
							</p>
							<p
								dir="ltr"
								style="
									line-height: 2.38464;
									text-align: justify;
									margin-top: 0pt;
									margin-bottom: 0pt;
								">
								<span class="gmail_signature_prefix" style="text-align: start"
									>--</span
								><br style="text-align: start" />
							</p>
							<div dir="ltr" class="gmail_signature">
								<div dir="ltr">
									<p
										dir="ltr"
										style="
											line-height: 1.9872;
											text-align: justify;
											margin-top: 0pt;
											margin-bottom: 0pt;
										">
										<span
											style="
												background-color: transparent;
												color: rgb(66, 133, 244);
												font-family: 'Google Sans', sans-serif;
												font-size: 13pt;
												font-weight: 700;
											"
											>Google Developer Student Club - HCMUT</span
										><br />
									</p>
									<p dir="ltr">
										<span
											style="
												background-color: transparent;
												color: rgb(85, 85, 85);
												font-family: 'Google Sans', sans-serif;
												font-size: 11pt;
											"
											>Ho Chi Minh City University of Technology</span
										>
									</p>
									<p
										dir="ltr"
										style="
											line-height: 1.5;
											text-align: justify;
											margin-top: 0pt;
											margin-bottom: 0pt;
										">
										<span
											style="
												font-size: 10pt;
												font-family: 'Google Sans', sans-serif;
												color: rgb(85, 85, 85);
												background-color: transparent;
												font-weight: 700;
												font-style: italic;
												vertical-align: baseline;
											"
											>Email:</span
										><span
											style="
												font-size: 10pt;
												font-family: 'Google Sans', sans-serif;
												color: rgb(85, 85, 85);
												background-color: transparent;
												font-style: italic;
												vertical-align: baseline;
											"
											>&nbsp;</span
										><span
											style="
												font-size: 10pt;
												font-family: 'Google Sans', sans-serif;
												color: rgb(17, 85, 204);
												background-color: transparent;
												font-style: italic;
												vertical-align: baseline;
											"
											><a href="mailto:external@gdschcmut.dev" target="_blank"
												>external@gdschcmut.dev</a
											></span
										>
									</p>
									<p
										dir="ltr"
										style="
											line-height: 1.5;
											text-align: justify;
											margin-top: 0pt;
											margin-bottom: 0pt;
										">
										<span
											style="
												font-size: 10pt;
												font-family: 'Google Sans', sans-serif;
												color: rgb(85, 85, 85);
												background-color: transparent;
												font-weight: 700;
												font-style: italic;
												vertical-align: baseline;
											"
											>Facebook:</span
										><a
											href="https://streaklinks.com/Bjpa0PjJyY_8GKiY4QrQggQZ/https%3A%2F%2Fwww.facebook.com%2Fdscxhcmut%2F"
											target="_blank"
											data-saferedirecturl="https://www.google.com/url?q=https://streaklinks.com/Bjpa0PjJyY_8GKiY4QrQggQZ/https%253A%252F%252Fwww.facebook.com%252Fdscxhcmut%252F&amp;source=gmail&amp;ust=1687683349196000&amp;usg=AOvVaw10AaRk6vHQnt1oMmX1W0Ax"
											hspace="streak-track"
											><span
												style="
													font-size: 10pt;
													font-family: 'Google Sans', sans-serif;
													background-color: transparent;
													font-weight: 700;
													font-style: italic;
													vertical-align: baseline;
												"
												>&nbsp;</span
											><span
												style="
													font-size: 10pt;
													font-family: 'Google Sans', sans-serif;
													background-color: transparent;
													font-style: italic;
													vertical-align: baseline;
												"
												>https://www.<wbr />facebook.com/dscxhcmut/</span
											></a
										>
									</p>
									<p
										dir="ltr"
										style="
											line-height: 1.5;
											text-align: justify;
											margin-top: 0pt;
											margin-bottom: 0pt;
										">
										<span
											style="
												font-size: 10pt;
												font-family: 'Google Sans', sans-serif;
												color: rgb(85, 85, 85);
												background-color: transparent;
												font-weight: 700;
												font-style: italic;
												vertical-align: baseline;
											"
											>Address:</span
										><span
											style="
												font-size: 10pt;
												font-family: 'Google Sans', sans-serif;
												color: rgb(85, 85, 85);
												background-color: transparent;
												font-style: italic;
												vertical-align: baseline;
											"
											>&nbsp;268 Ly Thuong Kiet, Ward 14, District 10, Ho Chi
											Minh City</span
										>
									</p>
									<p
										dir="ltr"
										style="
											line-height: 1.9872;
											text-align: justify;
											margin-top: 10pt;
											margin-bottom: 10pt;
										">
										<img
											src="https://lh3.googleusercontent.com/50_mjsumDlf3TxYZftBmOzknUCjZVRutjRs0vLOV3SdtYeSA23aHaxXOXEKuYjX9BnHCkdA8j7FYd_89LWWQFKWt7GOsXe63bsdnd7ebhozFn3XgUumUwMrXom43yk-9-KPGWsULONmi2WElr8X6bR-xCwUSzDKHaAWLuezjcU7C5kpl52zKrhJLWcCpf-g"
											width="439"
											height="53"
											style="
												background-color: transparent;
												font-family: Arial;
												font-size: 11pt;
												margin-left: 0px;
												margin-top: 0px;
											"
											class="CToWUd"
											data-bit="iit" />
									</p>
								</div>
							</div>
						</td>
					</tr>
					<tr style="height: 90pt">
						<td
							style="
								vertical-align: top;
								background-color: rgb(227, 242, 253);
								padding: 18pt;
								overflow: hidden;
							">
							<br />
							<p
								dir="ltr"
								style="
									line-height: 1.2;
									text-align: center;
									margin-top: 0pt;
									margin-bottom: 0pt;
								">
								<span
									style="
										font-size: 11pt;
										font-family: 'Google Sans', sans-serif;
										color: rgb(255, 255, 255);
										background-color: transparent;
										font-variant-numeric: normal;
										font-variant-east-asian: normal;
										font-variant-alternates: normal;
										text-decoration-line: underline;
									"
									><span
										style="
											border: none;
											display: inline-block;
											overflow: hidden;
											width: 101px;
											height: 48px;
										"
										><img
											src="https://lh3.googleusercontent.com/drive-viewer/AFGJ81o4cmsBDB9UXFovPFdKk-2zzhrFlkcf9WwLP14WzFhJBGwUKXWeSDxZpYc6J0hC0DIoTL_y4UQWiVDNVo7_mcaFz38w=w1920-h961"
											alt="image.png"
											width="99"
											height="48"
											data-image-whitelisted=""
											class="CToWUd"
											data-bit="iit" /></span></span
								><font color="#888888"
									><span
										style="
											font-size: 11pt;
											font-family: 'Google Sans', sans-serif;
											color: rgb(255, 255, 255);
											background-color: transparent;
											font-variant-numeric: normal;
											font-variant-east-asian: normal;
											font-variant-alternates: normal;
											text-decoration-line: underline;
										"
										><br /><br /></span
								></font>
							</p>
						</td>
					</tr>
				</tbody>
			</table></div></span
	><font color="#888888"
		><div dir="ltr" data-smartmail="gmail_signature"></div
	></font>
</div>

    `
}

export function THANK_YOU_EMAIL(
    receiver: string
) {
    return `
    <div
	id=":1hc"
	class="Am Al editable LW-avf tS-tW"
	hidefocus="true"
	aria-label="Message Body"
	g_editable="true"
	role="textbox"
	aria-multiline="true"
	contenteditable="true"
	tabindex="1"
	itacorner="6,7:1,1,0,0"
	spellcheck="false"
	style="direction: ltr; min-height: 652px"
	aria-owns=":1jy"
	aria-controls=":1jy"
	aria-expanded="false">
	<div dir="ltr" align="center" style="margin-left: 0pt">
		<table style="border: none; border-collapse: collapse">
			<colgroup>
				<col width="816" />
			</colgroup>
			<tbody>
				<tr style="height: 209.25pt">
					<td style="vertical-align: top; overflow: hidden">
						<p
							dir="ltr"
							style="line-height: 1.2; margin-top: 0pt; margin-bottom: 0pt">
							<span
								style="
									font-size: 11pt;
									font-family: 'Google Sans', sans-serif;
									color: rgb(32, 33, 36);
									background-color: transparent;
									font-variant-numeric: normal;
									font-variant-east-asian: normal;
									font-variant-alternates: normal;
								"
								><span
									style="
										border: none;
										display: inline-block;
										overflow: hidden;
										width: 816px;
										height: 276px;
									"
									><img
										src="https://lh3.googleusercontent.com/4FH01t7UqSiT3fe35bqcmamlvQK1Oi2gAMTUpzPMaVZlgkWsWb-ZqnFD5MNcGEjDONfnABVaJs7O1PS_u_g7hQdx_0UQBlnaJ0o6T94xikxWLrXMbnDw9i3VrJ9U9i5eRz7ymJKucBQCaBnMar_8pHVPbtFIM72Kth8kDnTC5ehMF3-MvyCskPRuIUNllkc"
										width="816"
										height="276"
										style="margin-left: 0px; margin-top: 0px" /></span
							></span>
						</p>
						<div dir="ltr" style="opacity: 0.01">
							<div
								id="m_-2185341078707151648m_-4896764194897145262m_4393872819365453353m_7953951560543563213:xl"
								role="button"
								aria-label="Download attachment">
								<div><div></div></div>
							</div>
						</div>
						<p></p>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<br />
	<div dir="ltr" align="center" style="margin-left: 0pt">
		<table style="border: none; border-collapse: collapse">
			<colgroup>
				<col width="816" />
			</colgroup>
			<tbody>
				<tr style="height: 0pt">
					<td
						style="
							vertical-align: top;
							background-color: rgb(243, 243, 243);
							padding: 72pt;
							overflow: hidden;
						">
						<p
							dir="ltr"
							style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt">
							<span
								style="
									font-size: 12pt;
									font-family: Arial;
									color: rgb(0, 0, 0);
									background-color: transparent;
									font-weight: 400;
									font-style: normal;
									font-variant: normal;
									text-decoration: none;
								"
								>Thân gửi </span
							><span
								style="
									font-size: 12pt;
									font-family: Arial;
									color: rgb(0, 0, 0);
									background-color: transparent;
									font-weight: 700;
									font-style: normal;
									font-variant: normal;
									text-decoration: none;
								"
								>${receiver}</span
							><span
								style="
									font-size: 12pt;
									font-family: Arial;
									color: rgb(0, 0, 0);
									background-color: transparent;
									font-weight: 400;
									font-style: normal;
									font-variant: normal;
									text-decoration: none;
								"
								>,</span
							>
						</p>
						<p
							dir="ltr"
							style="line-height: 1.2; margin-top: 0pt; margin-bottom: 10pt">
							<b
								style="font-weight: normal"
								id="gmail-docs-internal-guid-b5427205-7fff-0445-7b0b-9bd5e1c65fe4"
								><br
							/></b>
						</p>
						<p
							dir="ltr"
							style="
								line-height: 1.8;
								text-align: justify;
								margin-top: 0pt;
								margin-bottom: 10pt;
							">
							<span
								style="
									font-size: 12pt;
									font-family: Arial;
									color: rgb(0, 0, 0);
									background-color: transparent;
									font-weight: 400;
									font-style: normal;
									font-variant: normal;
									text-decoration: none;
								"
								>Đối ngoại Câu lạc bộ </span
							><span
								style="
									font-size: 12pt;
									font-family: Arial;
									color: rgb(0, 0, 0);
									background-color: transparent;
									font-weight: 700;
									font-style: normal;
									font-variant: normal;
									text-decoration: none;
								"
								>Google Developer Student Club - HCMUT (GDSC HCMUT)</span
							><span
								style="
									font-size: 12pt;
									font-family: Arial;
									color: rgb(0, 0, 0);
									background-color: rgb(255, 255, 255);
									font-weight: 400;
									font-style: normal;
									font-variant: normal;
									text-decoration: none;
								"
								>,</span
							><span
								style="
									font-size: 12pt;
									font-family: Arial;
									color: rgb(0, 0, 0);
									font-weight: 700;
									font-style: normal;
									font-variant: normal;
									text-decoration: none;
								">
								Trường Đại học Bách khoa - Đại học Quốc gia TP.HCM</span
							><span
								style="
									font-size: 12pt;
									font-family: Arial;
									color: rgb(0, 0, 0);
									background-color: transparent;
									font-weight: 400;
									font-style: normal;
									font-variant: normal;
									text-decoration: none;
								">
								xin gửi lời chào thân mật và lời cảm ơn chân thành với sự đồng
								hành của </span
							><span
								style="
									font-size: 12pt;
									font-family: Arial;
									color: rgb(0, 0, 0);
									background-color: transparent;
									font-weight: 700;
									font-style: normal;
									font-variant: normal;
									text-decoration: none;
								"
								>${receiver}</span
							><span
								style="
									font-size: 12pt;
									font-family: Arial;
									color: rgb(0, 0, 0);
									background-color: transparent;
									font-weight: 400;
									font-style: normal;
									font-variant: normal;
									text-decoration: none;
								">
								cùng </span
							><span
								style="
									font-size: 12pt;
									font-family: Arial;
									color: rgb(0, 0, 0);
									background-color: transparent;
									font-weight: 700;
									font-style: normal;
									font-variant: normal;
									text-decoration: none;
								"
								>GDSC HCMUT</span
							><span
								style="
									font-size: 12pt;
									font-family: Arial;
									color: rgb(0, 0, 0);
									background-color: transparent;
									font-weight: 400;
									font-style: normal;
									font-variant: normal;
									text-decoration: none;
								">
								trong suốt thời gian qua.</span
							>
						</p>
						<p
							dir="ltr"
							style="
								line-height: 1.8;
								text-align: justify;
								margin-top: 0pt;
								margin-bottom: 10pt;
							">
							<span
								style="
									font-size: 12pt;
									font-family: Arial;
									color: rgb(0, 0, 0);
									background-color: transparent;
									font-weight: 400;
									font-style: normal;
									font-variant: normal;
									text-decoration: none;
								"
								>Cuộc thi </span
							><span
								style="
									font-size: 12pt;
									font-family: Arial;
									color: rgb(0, 0, 0);
									background-color: transparent;
									font-weight: 700;
									font-style: normal;
									font-variant: normal;
									text-decoration: none;
								"
								>“GDSC Idea Contest 2023: THiNK” (GIC)</span
							><span
								style="
									font-size: 12pt;
									font-family: Arial;
									color: rgb(0, 0, 0);
									background-color: transparent;
									font-weight: 400;
									font-style: normal;
									font-variant: normal;
									text-decoration: none;
								">
								do </span
							><span
								style="
									font-size: 12pt;
									font-family: Arial;
									color: rgb(0, 0, 0);
									background-color: transparent;
									font-weight: 700;
									font-style: normal;
									font-variant: normal;
									text-decoration: none;
								"
								>GDSC HCMUT</span
							><span
								style="
									font-size: 12pt;
									font-family: Arial;
									color: rgb(0, 0, 0);
									background-color: transparent;
									font-weight: 400;
									font-style: normal;
									font-variant: normal;
									text-decoration: none;
								">
								tổ chức đã diễn ra thành công tốt đẹp và để lại nhiều dư âm tốt
								đẹp. Để làm được điều này không thể không kể đến sự tham gia
								nhiệt tình, tinh thần cạnh tranh lành mạnh của toàn thể các thí
								sinh.</span
							>
						</p>
						<p
							dir="ltr"
							style="
								line-height: 1.8;
								text-align: justify;
								margin-top: 0pt;
								margin-bottom: 10pt;
							">
							<span
								style="
									font-size: 12pt;
									font-family: Arial;
									color: rgb(0, 0, 0);
									background-color: transparent;
									font-weight: 400;
									font-style: normal;
									font-variant: normal;
									text-decoration: none;
								"
								>Toàn thể thành viên </span
							><span
								style="
									font-size: 12pt;
									font-family: Arial;
									color: rgb(0, 0, 0);
									background-color: transparent;
									font-weight: 700;
									font-style: normal;
									font-variant: normal;
									text-decoration: none;
								"
								>GDSC HCMUT</span
							><span
								style="
									font-size: 12pt;
									font-family: Arial;
									color: rgb(0, 0, 0);
									background-color: transparent;
									font-weight: 400;
									font-style: normal;
									font-variant: normal;
									text-decoration: none;
								">
								xin gửi lời cảm ơn sâu sắc đến </span
							><span
								style="
									font-size: 12pt;
									font-family: Arial;
									color: rgb(0, 0, 0);
									background-color: transparent;
									font-weight: 700;
									font-style: normal;
									font-variant: normal;
									text-decoration: none;
								"
								>${receiver}</span
							><span
								style="
									font-size: 12pt;
									font-family: Arial;
									color: rgb(0, 0, 0);
									background-color: transparent;
									font-weight: 400;
									font-style: normal;
									font-variant: normal;
									text-decoration: none;
								">
								vì đã lựa chọn GIC là nơi để tỏa sáng và thể hiện niềm đam mê
								của bản thân. Hành trình bạn trải qua, GDSC HCMUT mong rằng đó
								là những hành trang đẹp, bổ ích hỗ trợ cho bạn trong thời gian
								sắp tới. Kết quả ngày hôm nay có thể không như bạn mong muốn
								nhưng qua quá trình bạn tham gia, chúng mình tin rằng trong một
								ngày không xa, bạn sẽ tỏa sáng. Các bạn có thể xem thêm các hình
								ảnh, bài viết tổng kết sự kiện tại trang fanpage </span
							><a
								href="https://www.facebook.com/dscxhcmut"
								style="text-decoration: none"
								hspace="streak-track"
								><span
									style="
										font-size: 12pt;
										font-family: Arial;
										color: rgb(17, 85, 204);
										background-color: transparent;
										font-weight: 400;
										font-style: normal;
										font-variant: normal;
										text-decoration: underline;
										text-decoration-skip-ink: none;
									"
									>facebook.com/dscxhcmut</span
								></a
							><span
								style="
									font-size: 12pt;
									font-family: Arial;
									color: rgb(0, 0, 0);
									background-color: transparent;
									font-weight: 400;
									font-style: normal;
									font-variant: normal;
									text-decoration: none;
								"
								>.&nbsp;</span
							>
						</p>
						<p
							dir="ltr"
							style="
								line-height: 1.8;
								text-align: justify;
								margin-top: 0pt;
								margin-bottom: 10pt;
							">
							<span
								style="
									font-size: 12pt;
									font-family: Arial;
									color: rgb(0, 0, 0);
									background-color: transparent;
									font-weight: 400;
									font-style: normal;
									font-variant: normal;
									text-decoration: none;
								"
								>Một lần nữa, GDSC HCMUT chân thành cảm ơn bạn đã tham gia và
								nhiệt huyết hết mình với cuộc thi. Chúng mình mong rằng bạn vẫn
								luôn giữ lấy tinh thần sáng tạo, cùng với những kinh nghiệm đã
								trải qua và tiếp bước vững vàng. Hy vọng sẽ được đồng hành cùng
								bạn trong các hoạt động sắp tới.</span
							>
						</p>
						<p
							dir="ltr"
							style="
								line-height: 1.8;
								text-align: justify;
								margin-top: 0pt;
								margin-bottom: 10pt;
							">
							<span
								style="
									font-size: 12pt;
									font-family: Arial;
									color: rgb(0, 0, 0);
									background-color: transparent;
									font-weight: 400;
									font-style: normal;
									font-variant: normal;
									text-decoration: none;
								"
								>Kính chúc bạn lời chúc sức khỏe và gặt hái nhiều thành công
								trong tương lai!</span
							>
						</p>
						<p
							dir="ltr"
							style="
								line-height: 1.8;
								text-align: justify;
								margin-top: 0pt;
								margin-bottom: 10pt;
							">
							<span
								style="
									font-size: 12pt;
									font-family: Arial;
									color: rgb(0, 0, 0);
									background-color: transparent;
									font-weight: 400;
									font-style: normal;
									font-variant: normal;
									text-decoration: none;
								"
								>Trân trọng./</span
							>
						</p>
						<p
							dir="ltr"
							style="line-height: 1.2; margin-top: 0pt; margin-bottom: 10pt">
							<span class="gmail_signature_prefix">--</span><br />
						</p>
						<div dir="ltr" class="gmail_signature">
							<div dir="ltr">
								<p
									dir="ltr"
									style="
										line-height: 1.9872;
										text-align: justify;
										margin-top: 0pt;
										margin-bottom: 0pt;
									">
									<span
										style="
											background-color: transparent;
											color: rgb(66, 133, 244);
											font-family: 'Google Sans', sans-serif;
											font-size: 13pt;
											font-weight: 700;
										"
										>Google Developer Student Club - HCMUT</span
									><br />
								</p>
								<p dir="ltr">
									<span
										style="
											background-color: transparent;
											color: rgb(85, 85, 85);
											font-family: 'Google Sans', sans-serif;
											font-size: 11pt;
										"
										>Ho Chi Minh City University of Technology</span
									>
								</p>
								<p
									dir="ltr"
									style="
										line-height: 1.5;
										text-align: justify;
										margin-top: 0pt;
										margin-bottom: 0pt;
									">
									<span
										style="
											font-size: 10pt;
											font-family: 'Google Sans', sans-serif;
											color: rgb(85, 85, 85);
											background-color: transparent;
											font-weight: 700;
											font-style: italic;
											vertical-align: baseline;
										"
										>Email:</span
									><span
										style="
											font-size: 10pt;
											font-family: 'Google Sans', sans-serif;
											color: rgb(85, 85, 85);
											background-color: transparent;
											font-style: italic;
											vertical-align: baseline;
										"
										>&nbsp;</span
									><span
										style="
											font-size: 10pt;
											font-family: 'Google Sans', sans-serif;
											color: rgb(17, 85, 204);
											background-color: transparent;
											font-style: italic;
											vertical-align: baseline;
										"
										><a href="mailto:external@gdschcmut.dev" target="_blank"
											>external@gdschcmut.dev</a
										></span
									>
								</p>
								<p
									dir="ltr"
									style="
										line-height: 1.5;
										text-align: justify;
										margin-top: 0pt;
										margin-bottom: 0pt;
									">
									<span
										style="
											font-size: 10pt;
											font-family: 'Google Sans', sans-serif;
											color: rgb(85, 85, 85);
											background-color: transparent;
											font-weight: 700;
											font-style: italic;
											vertical-align: baseline;
										"
										>Facebook:</span
									><a
										href="https://streak-link.com/BdxGwFh8fK8-stME1wcDbGuW/https%3A%2F%2Fwww.facebook.com%2Fdscxhcmut%2F?email=external%40gdschcmut.dev"
										hspace="streak-track"
										target="_blank"
										><span
											style="
												font-size: 10pt;
												font-family: 'Google Sans', sans-serif;
												background-color: transparent;
												font-weight: 700;
												font-style: italic;
												vertical-align: baseline;
											"
											>&nbsp;</span
										><span
											style="
												font-size: 10pt;
												font-family: 'Google Sans', sans-serif;
												background-color: transparent;
												font-style: italic;
												vertical-align: baseline;
											"
											>https://www.facebook.com/dscxhcmut/</span
										></a
									>
								</p>
								<p
									dir="ltr"
									style="
										line-height: 1.5;
										text-align: justify;
										margin-top: 0pt;
										margin-bottom: 0pt;
									">
									<span
										style="
											font-size: 10pt;
											font-family: 'Google Sans', sans-serif;
											color: rgb(85, 85, 85);
											background-color: transparent;
											font-weight: 700;
											font-style: italic;
											vertical-align: baseline;
										"
										>Address:</span
									><span
										style="
											font-size: 10pt;
											font-family: 'Google Sans', sans-serif;
											color: rgb(85, 85, 85);
											background-color: transparent;
											font-style: italic;
											vertical-align: baseline;
										"
										>&nbsp;268 Ly Thuong Kiet, Ward 14, District 10, Ho Chi Minh
										City</span
									>
								</p>
								<p
									dir="ltr"
									style="
										line-height: 1.9872;
										text-align: justify;
										margin-top: 10pt;
										margin-bottom: 10pt;
									">
									<img
										src="https://lh3.googleusercontent.com/50_mjsumDlf3TxYZftBmOzknUCjZVRutjRs0vLOV3SdtYeSA23aHaxXOXEKuYjX9BnHCkdA8j7FYd_89LWWQFKWt7GOsXe63bsdnd7ebhozFn3XgUumUwMrXom43yk-9-KPGWsULONmi2WElr8X6bR-xCwUSzDKHaAWLuezjcU7C5kpl52zKrhJLWcCpf-g"
										width="439"
										height="53"
										style="
											background-color: transparent;
											font-family: Arial;
											font-size: 11pt;
											margin-left: 0px;
											margin-top: 0px;
										" />
								</p>
							</div>
						</div>
					</td>
				</tr>
				<tr style="height: 90pt">
					<td
						style="
							vertical-align: top;
							background-color: rgb(227, 242, 253);
							padding: 18pt;
							overflow: hidden;
						">
						<br />
						<p
							dir="ltr"
							style="
								line-height: 1.2;
								text-align: center;
								margin-top: 0pt;
								margin-bottom: 0pt;
							">
							<span
								style="
									font-size: 11pt;
									font-family: 'Google Sans', sans-serif;
									color: rgb(255, 255, 255);
									background-color: transparent;
									font-variant-numeric: normal;
									font-variant-east-asian: normal;
									font-variant-alternates: normal;
									text-decoration-line: underline;
								"
								><span
									style="
										border: none;
										display: inline-block;
										overflow: hidden;
										width: 101px;
										height: 48px;
									"
									><img
										src="https://lh4.googleusercontent.com/kGALsmB6g8G7kxrXtF1eM898HulBxm12ZNUpucjzOGQ2Nw8umk0jPm5RWhPHv21Mj3tEyniq8AUVuSsFzdMClJgWPbLxDYtZMoO-z9qt6-RqD76LGLsubrMoCqxbBo-viCcESTZ9Ip1Rm5cDCwfeDnWCPu8ZDIpycGT8tRo4R1l6v0T10Wg1aW6RiLpQrxw"
										width="98.72953986652618"
										height="48"
										style="margin-left: 0px; margin-top: 0px" /></span></span
							><span
								style="
									font-size: 11pt;
									font-family: 'Google Sans', sans-serif;
									color: rgb(255, 255, 255);
									background-color: transparent;
									font-variant-numeric: normal;
									font-variant-east-asian: normal;
									font-variant-alternates: normal;
									text-decoration-line: underline;
								"
								><br /><br
							/></span>
						</p>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div><br /></div>
	<br />
</div>
    `
}

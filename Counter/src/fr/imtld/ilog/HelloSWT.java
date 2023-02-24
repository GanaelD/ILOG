package fr.imtld.ilog;

import org.eclipse.swt.SWT;
import org.eclipse.swt.graphics.Rectangle;
import org.eclipse.swt.layout.FormLayout;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Menu;
import org.eclipse.swt.widgets.MenuItem;
import org.eclipse.swt.widgets.Shell;

public class HelloSWT {
	private static HelloSWT ui = null;
	private Shell sShell = null;
	private Menu mbMain = null;
	private Menu mbFile = null;
	public void run() {
		Display display = Display.getDefault();
		createSShell();
		sShell.open();
		while (!sShell.isDisposed()) {
			if (!display.readAndDispatch())
				display.sleep();
		}
		display.dispose();
	}
	private void createSShell() {
		sShell = new Shell();
		sShell.setText("Hello SWT");
		sShell.setLayout(new FormLayout());
		sShell.setBounds(new Rectangle(110, 145, 500, 350));
		mbMain = new Menu(sShell, SWT.BAR);
		MenuItem miFile = new MenuItem(mbMain, SWT.CASCADE);
		miFile.setText("&File");
		mbFile = new Menu(miFile);
		MenuItem miExit = new MenuItem(mbFile, SWT.PUSH);
		miExit.setText("E&xit");
		miExit.addSelectionListener(new org.eclipse.swt.events.SelectionListener() {
			public void widgetSelected(org.eclipse.swt.events.SelectionEvent e) {
				System.exit(0);
			}
			public void widgetDefaultSelected(org.eclipse.swt.events.SelectionEvent e) {
			}
		});
		miFile.setMenu(mbFile);
		sShell.setMenuBar(mbMain);
	}
	public static void main(String[] args) {
		ui = new HelloSWT();
		ui.run();
	}	
}
